import styled from "styled-components"
import { Table } from "antd"
interface Summaries {
  summaries: SummaryResponse
}

function DetailList({summaries}: Summaries) {
  let income = 0
  let expenses = 0

  for(let i = 0; i < summaries.length; i++) {
    if(summaries[i].totalAmount >= 0) {
      income += summaries[i].totalAmount
    } else {
      expenses += summaries[i].totalAmount
    }
  }

  // table
  const tableitemSource = summaries.map((item, index) => ({
    key: index+1,
    summaiesDate : item._id,
    summariesAmount: item.totalAmount >= 0 ? item.totalAmount.toLocaleString() : <StyleListExpense>{item.totalAmount.toLocaleString()}</StyleListExpense>
  }))

  const itemColumns = [
    {
      title: '날짜',
      dataIndex: 'summaiesDate',
      key: 'summaiesDate'
    },
    {
      title: '금액',
      dataIndex: 'summariesAmount',
      key: 'summariesAmount',
    }
  ]


  return (
    <div>
      <Table
        dataSource={tableitemSource}
        columns={itemColumns}
        pagination={{pageSize: 5, simple: true}}
        size="small"
      />
      <StyleAmount>
        <StyleIncome>
          수입 : {income.toLocaleString()}  원
        </StyleIncome>
        <SytleExpese>
          지출 : {expenses.toLocaleString()}  원
        </SytleExpese>
      </StyleAmount>
    </div>

  )
}

export default DetailList

const StyleListExpense = styled.span`
  color: red
`

const StyleAmount = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`

const StyleIncome = styled.div`
  display: inline-block;
`

const SytleExpese = styled.div`
  display: inline-block;
  margin-left: 40px;
  color: red
`
