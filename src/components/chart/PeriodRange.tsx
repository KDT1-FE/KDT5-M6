import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0 25px;
    font-size: 27px;
    font-family: 'TheJamsil3Regular';
  }
`

const StyledLeftIcon = styled(ChevronLeftIcon)`
  width: 45px;
  transition: 300ms;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const StyledRightIcon = styled(ChevronRightIcon)`
  width: 45px;
  transition: 300ms;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

export const PeriodRange = ({
  selectedDate,
  handlePrevMonth,
  handleNextMonth
}) => {
  return (
    <div>
      <Wrapper>
        <StyledLeftIcon onClick={handlePrevMonth} />
        <p>
          {selectedDate.year}년 {selectedDate.month}월
        </p>
        <StyledRightIcon onClick={handleNextMonth} />
      </Wrapper>
    </div>
  )
}
