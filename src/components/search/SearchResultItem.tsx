import React from 'react'
import { ExpenseData } from 'types/index'
import { styled } from 'styled-components'
import moment from 'moment'

type SearchResultItemProps = {
  data: ExpenseData
}

export const SearchResultItem = React.memo(({ data }: SearchResultItemProps) => {
  return (
    <Wrapper key={data.date}>
      <span className="date">{moment(data.date).format('YYYY년 MM월 DD일')}</span>
      <span>{data.category}</span>
      <span className="price">{(-data.amount).toLocaleString()} 원</span>
    </Wrapper>
  )
})

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #eee;

  span {
    font-size: 18px;

    &.date {
    }

    &.price {
      text-align: right;
      color: #ef3434cd;
    }
  }
`
