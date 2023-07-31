import styled from 'styled-components'
import { Calendar } from 'types/index'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

interface WeekSummaryProps {
  weekExpenses: Calendar[]
  index: number
  onClick: () => void
  isOpened: boolean
}

export const WeekSummary = ({ weekExpenses, index, onClick, isOpened }: WeekSummaryProps) => {
  // 주 지출 총액 계산
  const totalAmount = weekExpenses.reduce(
    (acc: number, expense: Calendar) => acc + expense.amount,
    0
  )

  // 주 시작일 계산
  const weekStartDay = new Date(weekExpenses[0].date).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric'
  })

  // 주 종료일 계산
  const weekEndDay = new Date(weekExpenses[weekExpenses.length - 1].date).toLocaleDateString(
    undefined,
    { month: 'long', day: 'numeric' }
  )

  return (
    <WeekContainer
      key={index}
      isOpend={isOpened}
      onClick={onClick}>
      <div className="icon">{isOpened ? <BiChevronUp /> : <BiChevronDown />}</div>
      <WeekTitle>{`${weekStartDay} ~ ${weekEndDay} (${index + 1}주차)`}</WeekTitle>
      <TotalAmount>{totalAmount.toLocaleString()}원</TotalAmount>
    </WeekContainer>
  )
}

const WeekContainer = styled.div<{ isOpend: boolean }>`
  display: flex;
  position: relative;
  cursor: pointer;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid ${({ isOpend }) => (isOpend ? 'transparent' : '#ececec')};

  .icon {
    font-size: 24px;
  }
`

const WeekTitle = styled.div`
  font-weight: bold;
  margin-left: 10px;
  font-size: 16px;
`

const TotalAmount = styled.div`
  position: absolute;
  right: 0;
  font-weight: bold;
  font-size: 18px;
`
