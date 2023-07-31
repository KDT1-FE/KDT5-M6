import { ChevronRightIcon } from '@heroicons/react/outline'
import styled from 'styled-components'

// 차트 하단에 출력할 ChartList에서 사용하는 props type 정의
type ChartListProps = {
  chartFilter: 'income' | 'expenses' // 수입, 지출 필터링 유형
  totalAmount: number // 총 수입, 총 지출
  categoryList: { [category: string]: number } // 카테고리별 금액
  sortByAmount: (a: [string, number], b: [string, number]) => number // 금액 순 정렬
  handleShowSubChart: (category: string) => void // 카테고리에 대한 SubChart 출력 함수
}

// Styled-components 스타일링
const ChartListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`
const ListTotalExpenses = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
  margin-bottom: 20px;
  border: 3px solid ${props => props.theme.colors.text_secondary};
  font-family: 'TheJamsil3Regular';
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  background-color: #fff;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.text_secondary};
  font-family: 'TheJamsil1Thin';
  font-size: 20px;
  background-color: #fff;

  h3 {
    flex: 1;
    position: relative;
    left: 20px;
    font-family: 'TheJamsil3Regular';
  }

  p {
    margin-right: 20px;
  }
`

const NavIcon = styled(ChevronRightIcon)`
  width: 30px;
  cursor: pointer;
  transition: all 300ms;
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

// ChartList Component
export const ChartList: React.FC<ChartListProps> = ({
  chartFilter,
  totalAmount,
  categoryList,
  sortByAmount,
  handleShowSubChart
}) => {
  return (
    <>
      <ChartListWrapper>
        <ul>
          {chartFilter === 'income' && (
            <ListTotalExpenses>
              <h3>전체</h3>
              <p>{totalAmount.toLocaleString()}원</p>
            </ListTotalExpenses>
          )}
          {chartFilter === 'expenses' && (
            <ListTotalExpenses>
              <h3>전체</h3>
              <p>{totalAmount.toLocaleString()}원</p>
            </ListTotalExpenses>
          )}
          {Object.entries(categoryList)
            .sort(sortByAmount)
            .map(([category, amount]) => (
              <ListItem key={category}>
                <h3>{category}</h3>
                <p>{amount.toLocaleString()}원</p>
                <NavIcon onClick={() => handleShowSubChart(category)} />
              </ListItem>
            ))}
        </ul>
      </ChartListWrapper>
    </>
  )
}
