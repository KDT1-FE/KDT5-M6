import styled from 'styled-components'
import { chartCategory } from 'constants/index'
import { Calendar } from 'types/index'
import { ToggleButton } from 'components/index'

interface DailyExpenseProps {
  dailyExpenses: Calendar[]
  weekIndex: number
}

export const DailyExpense = ({ dailyExpenses, weekIndex }: DailyExpenseProps) => {
  return (
    <DailyWrapper>
      {/* 각각의 dailyExpenses를 렌더링 */}
      {dailyExpenses.map((expense: Calendar, index: number) => (
        <DailyContainer key={index}>
          {/* 날짜 표시 */}
          <DateBox>
            {new Date(expense.date).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              timeZone: "Asia/Seoul"
            })}
          </DateBox>
          {/* 카테고리 */}
          <Category
            categoryColor={
              chartCategory.find(c => c.category === expense.category)?.borderColor ?? '#333'
            }>
            {expense.category}
          </Category>
          {/* 칸 나누기 */}
          <FlexibleSpace />
          {/* 금액 */}
          <Amount>{expense.amount.toLocaleString()}원</Amount>
          {/* 수정 및 삭제 버튼 */}
          <ToggleButton
            expense={expense}
            weekIndex={weekIndex}
            index={index}
          />
        </DailyContainer>
      ))}
    </DailyWrapper>
  )
}

const DailyWrapper = styled.div`
  padding: 10px 20px;
  /* border: 2px solid black; */
  background-color: rgba(77, 77, 77, 0.1);
  border-radius: 8px;
`

const DailyContainer = styled.div`
  display: flex;
  padding: 10px 0;
`

const DateBox = styled.div`
  display: flex;
  flex-basis: 150px;
`

const Category = styled.div<{ categoryColor: string }>`
  color: ${({ categoryColor }) => categoryColor};
  font-weight: bold;
`

const FlexibleSpace = styled.div`
  flex-grow: 1;
`

const Amount = styled.div`
  font-weight: bold;
`
