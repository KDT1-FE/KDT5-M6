import { useRecoilState } from 'recoil'
import { dateState } from 'src/recoil/DateState'
import styled from 'styled-components'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

export function Month() {
  const [monthFilter, setMonthFilter] = useRecoilState<number>(dateState)
  // 버튼을 누르고나면 리코일에 현재 값이 전달됩니다.

  const handlePrevMonth = () => {
    setMonthFilter(prevMonth => (prevMonth === 1 ? 12 : prevMonth - 1))
  }

  const handleNextMonth = () => {
    setMonthFilter(nextMonth => (nextMonth === 12 ? 1 : nextMonth + 1))
  }

  return (
    <MonthLabel>
      <MonthButton onClick={handlePrevMonth}>
        <ChevronLeftIcon />
      </MonthButton>
      <CurMonth>{monthFilter}월</CurMonth>
      <MonthButton onClick={handleNextMonth}>
        <ChevronRightIcon />
      </MonthButton>
    </MonthLabel>
  )
}

const MonthLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const MonthButton = styled.button`
  margin-right: 5px;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${props => props.theme.colors.background};
  svg {
    width: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`

const CurMonth = styled.div`
  font-family: 'TheJamsil5Bold';
  font-weight: bold;
  font-size: 30px;
`
