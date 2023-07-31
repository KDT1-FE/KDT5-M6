import styled from 'styled-components'

// 수입, 지출 Filtering을 통해 차트를 출력할
// IncomeExpensesFilter에서 사용하는 props type 정의
type IncomeExpensesFilterProps = {
  chartFilter: 'income' | 'expenses' // 현재 선택된 필터 유형(수입, 지출)
  setChartFilter: (filter: 'income' | 'expenses') => void // 필터 유형을 변경하는 함수
}

// Style-components 스타일링
const FilterWrapper = styled.form`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`

const IncomesOptions = styled.span`
  margin-right: 25px;
  font-family: 'TheJamsil3Regular';
  font-size: 25px;
  color: ${props => props.theme.colors.secondary};
  accent-color: ${props => props.theme.colors.primary};
`

const ExpensesOptions = styled.span`
  font-family: 'TheJamsil3Regular';
  font-size: 25px;
  color: ${props => props.theme.colors.secondary};
  accent-color: ${props => props.theme.colors.primary};
`

// IncomeExpensesFilter Component
export const IncomeExpensesFilter: React.FC<IncomeExpensesFilterProps> = ({
  chartFilter,
  setChartFilter
}) => {
  return (
    <>
      <FilterWrapper>
        <IncomesOptions>
          <input
            type="checkbox"
            id="income"
            name="filter"
            value="income"
            checked={chartFilter === 'income'}
            onChange={() => setChartFilter('income')}
          />
          <label htmlFor="income">수입</label>
        </IncomesOptions>
        <ExpensesOptions>
          <input
            type="checkbox"
            id="expenses"
            name="filter"
            value="expenses"
            checked={chartFilter === 'expenses'}
            onChange={() => setChartFilter('expenses')}
          />
          <label htmlFor="expenses">지출</label>
        </ExpensesOptions>
      </FilterWrapper>
    </>
  )
}
