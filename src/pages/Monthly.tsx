import Full from '@/components/monthly/Calendar'
import { styled } from 'styled-components'

export const Monthly = () => {
  return <MonthlyContainer>
    <Full/>
    </MonthlyContainer>
}

const MonthlyContainer = styled.main`
  width: 100%;
  flex-grow: 1;
  padding-bottom:100px;
`