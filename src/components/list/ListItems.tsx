import React, { useState, useEffect } from 'react'
import {
  getMonthlyExpenses,
  MonthlyExpenses,
  Expense
} from 'src/api/MonthlyExpenses'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { dateState } from 'src/recoil/DateState'
import { theme } from 'style/index'
import { EditModal, DeleteExpense } from 'components/common/index'
import { PencilAltIcon } from '@heroicons/react/solid'
import { Loading } from 'components/common/index'
import { Month } from 'components/common/index'

export default function ListItems() {
  const monthFilter = useRecoilValue<number>(dateState)
  const [monthExpenses, setMonthExpenses] = useState<MonthlyExpenses[]>([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense>({} as Expense)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getExpenses = async () => {
      const year: number = new Date().getFullYear()
      const id = localStorage.getItem('id')
      const USERID = `team9-${id}`
      setIsLoading(true)

      const res = await getMonthlyExpenses(year, monthFilter, USERID)
      setMonthExpenses(res)

      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    getExpenses()
  }, [monthFilter])

  const sumAmountByDate = (expenses: MonthlyExpenses[], date: string) => {
    const amountArray: number[] = expenses[date].map(
      (expenses: Expense) => expenses.amount
    )
    const income: number = amountArray.reduce(
      (total: number, amount: number) => {
        if (amount > 0) {
          return total + amount
        }
        return total
      },
      0
    )

    const spend: number = amountArray.reduce(
      (total: number, amount: number) => {
        if (amount < 0) {
          return total + amount
        }
        return total
      },
      0
    )
    return {
      income,
      spend
    }
  }

  const handleUpdate = (updatedExpense: Expense) => {
    const updatedMonthExpenses = { ...monthExpenses }

    Object.keys(updatedMonthExpenses).forEach(date => {
      const expenses = updatedMonthExpenses[date].map(expense =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )

      updatedMonthExpenses[date] = expenses
    })

    setMonthExpenses(updatedMonthExpenses)
  }

  const handleDeleteExpense = (deletedExpenseId: string) => {
    const updatedMonthExpenses = { ...monthExpenses }

    Object.keys(updatedMonthExpenses).forEach(date => {
      const updatedExpenses = updatedMonthExpenses[date].filter(
        expense => expense._id !== deletedExpenseId
      )

      updatedMonthExpenses[date] = updatedExpenses
    })

    setMonthExpenses(updatedMonthExpenses)
  }

  const handleEditExpense = (expense: Expense) => {
    setSelectedExpense(expense)

    setEditModalOpen(true)
  }

  const formatNumber = (number: number) => {
    return number.toLocaleString()
  }

  const targetCategories = [
    '경조/선물',
    '자녀/육아',
    '교육/학습',
    '문화/여가',
    '금융',
    '식비',
    '주거/통신',
    '교통',
    '쇼핑',
    '생활/건강',
    '카테고리'
  ]

  const getCategoryIncluded = (expense: Expense): string | null => {
    const includedCategory = targetCategories.find(category =>
      expense.category.includes(category)
    )
    return includedCategory || null
  }

  const getCategoryExcluded = (expense: Expense): string | null => {
    const isExcludedCategory = targetCategories.some(category =>
      expense.category.includes(category)
    )

    if (isExcludedCategory) {
      const excludedCategory = targetCategories.reduce(
        (acc, category) => acc.replace(category, ''),
        expense.category
      )
      return excludedCategory.trim() || null
    } else {
      return expense.category
    }
  }

  return (
    <Wrapper>
      <Month />
      <ExpenseList>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {Object.keys(monthExpenses).length > 0 ? (
              <>
                {Object.keys(monthExpenses).map(date => {
                  const expenses = monthExpenses[date]
                  const { income, spend } = sumAmountByDate(monthExpenses, date)
                  return (
                    <div
                      key={date}
                      className="divider">
                      <DateRow>
                        <MonthDate>
                          {monthFilter}월 {date}일
                        </MonthDate>
                        <Title style={{ color: '#6471e9' }}>
                          수입 : {formatNumber(income)}원
                        </Title>
                        <Title style={{ color: '#fc6262' }}>
                          지출 : {formatNumber(spend)}원
                        </Title>
                        <Title>합계 : {formatNumber(income + spend)}원</Title>
                      </DateRow>
                      {expenses.map((expense, index) => (
                        <React.Fragment key={expense._id}>
                          <CategoryRow>
                            <Category>
                              {getCategoryIncluded(expense) || '카테고리'}
                            </Category>
                            <History>
                              내역 :
                              {' ' +
                                (
                                  getCategoryExcluded(expense) || '없음'
                                ).replace('.', '')}
                            </History>
                            <Expenditure
                              style={{
                                color:
                                  expense.amount > 0 ? '#6471e9' : '#fc6262'
                              }}>
                              {formatNumber(expense.amount)}원
                            </Expenditure>

                            <ModifyButton
                              onClick={() => handleEditExpense(expense)}>
                              <PencilAltIcon />
                            </ModifyButton>

                            <DeleteExpense
                              expenseId={expense._id}
                              onDelete={() => handleDeleteExpense(expense._id)}
                            />
                          </CategoryRow>
                          {index < expenses.length - 1 && (
                            <LineContainer>{/* <Line /> */}</LineContainer>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )
                })}
              </>
            ) : (
              <ErrorMsg>내역이 없습니다.</ErrorMsg>
            )}
            {editModalOpen && (
              <EditModal
                closeModal={() => setEditModalOpen(false)}
                expense={selectedExpense}
                onUpdateExpense={handleUpdate}
              />
            )}
          </>
        )}
      </ExpenseList>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  .divider {
    border-top: 1px solid #c4c4c4;
    &:first-child {
      border: none;
    }
    &:last-child {
      border-bottom: 1px solid #c4c4c4;
    }
  }
`

const ExpenseList = styled.div`
  width: 60vw;
  height: 75vh;
  border: 3px solid ${props => props.theme.colors.primary};
  margin: 20px auto;
  margin-bottom: 0px;
  overflow: auto;
  background-color: #fff;
  border-radius: 12px;
  align-items: center;

  @media ${props => props.theme.laptop} {
    width: 50vw;
    height: 75vh;
  }

  @media ${props => props.theme.desktop} {
    width: 60vw;
    height: 75vh;
  }
  @media ${props => props.theme.tablet} {
    width: 70vw;
    height: 70vh;
  }

  @media ${props => props.theme.mobile} {
    width: 90vw;
    height: 70vh;
  }
`

const DateRow = styled.div`
  /* border-bottom: 2px solid #c4c4c4; */
  padding: 10px;
  box-sizing: content-box;
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: flex-end;
`

const MonthDate = styled.div`
  margin-right: auto;
  margin-left: 10px;
  font-weight: bold;
  padding: 10px;
  font-family: 'TheJamsil5Bold';

  @media ${theme.mobile} {
    font-size: 14px;
  }
`

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 10px;
`

const Title = styled.span`
  font-size: 13px;
  width: 120px;
  font-family: 'TheJamsil3Regular';
  @media ${props => props.theme.laptop} {
    width: 110px;
  }

  @media ${props => props.theme.tablet} {
    width: 110px;
  }

  @media ${props => props.theme.mobile} {
    font-size: 11px;
    width: 110px;
  }
`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  margin-right: 10px;
  color: #fff;
  font-size: 13px;
  width: 60px;
  height: 20px;
  background-color: ${props => props.theme.colors.green};
  border-radius: 15px;
`

const History = styled.div`
  font-weight: 300;
  font-size: 13px;
  font-family: 'TheJamsil3Regular';
  @media ${props => props.theme.mobile} {
    font-size: 12px;
  }
`

const Expenditure = styled.div`
  margin-left: auto;
  font-weight: bold;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;

  @media ${props => props.theme.mobile} {
    font-size: 12px;
  }
`

const ErrorMsg = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 32px;
  justify-content: center;
  margin-top: 50px;
`
// const Line = styled.hr`
//   width: 90%;
//   border: 1px solid #c4c4c4;
//   margin: auto 0;
// `
const LineContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ModifyButton = styled.button`
  margin-right: 5px;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #fff;
  svg {
    width: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`
