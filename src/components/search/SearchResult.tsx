import React, { useMemo } from 'react'
import { ExpenseData } from 'types/index'
import { SearchResultItem } from 'components/index'
import { calculateExpendTotal } from 'utils/index'

import { styled } from 'styled-components'

type SearchResultProps = {
  results: ExpenseData[]
}

export const SearchResult = React.memo(({ results }: SearchResultProps) => {
  const totalPrice = useMemo(
    () => calculateExpendTotal(results.map(data => data.amount)),
    [results]
  )

  return (
    <Wrapper>
      <TotalCount>총 {results.length}건</TotalCount>
      <TotalPrice>
        <h4>총 지출</h4>
        <p>{totalPrice.toLocaleString()}원</p>
      </TotalPrice>
      <ul>
        {results.map(data => (
          <SearchResultItem data={data} />
        ))}
      </ul>
    </Wrapper>
  )
})

const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;

  ul {
    padding: 0 10px;
  }
`

const TotalCount = styled.div`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  line-height: 48px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`

const TotalPrice = styled.div`
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;

  h4 {
    font-size: 18px;
    font-weight: 600;
  }

  p {
    font-size: 24px;
    font-weight: 500;
    color: #ef3434;
    text-align: right;
    line-height: 56px;
  }
`
