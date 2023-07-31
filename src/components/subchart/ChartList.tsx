import styled from 'styled-components'

// 차트 하단에 출력할 ChartList에서 사용하는 props type 정의
type ChartListItem = {
  date: string
  category: string
  subCategory: string
  amount: number
}

type ChartListProps = {
  categoryExpenses: ChartListItem[]
}

// Styled-components 스타일링
const ChartListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const ChartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'TheJamsil1Thin';
  font-size: 20px;

  th {
    font-weight: bold;
    text-align: center;
  }

  th,
  td {
    padding: 15px;
    border: 2px solid ${props => props.theme.colors.text_secondary};
    text-align: center;
  }

  td {
    &:first-child {
      font-weight: bold;
    }
    &:nth-child(3) {
      font-weight: bold;
      color: ${props => props.theme.colors.primary};
    }
  }

  @media ${props => props.theme.mobile} {
  }
`

export const ChartList: React.FC<ChartListProps> = ({ categoryExpenses }) => {
  const compareDates = (a: ChartListItem, b: ChartListItem) => {
    // ChartList의 내역 날짜 비교
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB.getTime() - dateA.getTime()
  }

  // categoryExpenses 배열을 날짜 순으로(최신 날짜가 상단으로) 정렬
  const sortedExpenses = categoryExpenses.sort(compareDates)

  return (
    <>
      <ChartListWrapper>
        <ChartTable>
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>사용처</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map(expense => {
              const date = new Date(expense.date)
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()
              const formattedDate =
                // month, day를 두 자리 수로 출력
                `${year}.${month < 10 ? '0' : ''}${month}.${
                  day < 10 ? '0' : ''
                }${day}`

              return (
                <tr key={expense.date}>
                  <td>{formattedDate}</td>
                  <td>{expense.category}</td>
                  <td>{expense.subCategory}</td>
                  <td>{expense.amount.toLocaleString()}원</td>
                </tr>
              )
            })}
          </tbody>
        </ChartTable>
      </ChartListWrapper>
    </>
  )
}
