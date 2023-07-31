import { useState } from 'react'
import { chartCategory } from 'constants/index'
import { DateFilterTab, CategoryFilter, SearchResult } from 'components/index'
import { ExpenseData, ISearchQuery } from 'types/index'
import { searchByDateCategory } from 'apis/index'
import { sortByDate } from 'utils/index'

import { styled } from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'

const categories = chartCategory.map(c => c.category)

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
    startDate: null,
    endDate: null,
    categories: categories
  })
  const [selectedCategories, setSelectedCategories] = useState(categories)
  const [loading, setLoading] = useState(false)
  const [searchResult, setSearchResult] = useState<ExpenseData[] | null>(null)

  const onSelectDateFilter = (startDate: string, endDate: string) => {
    setSearchResult(null)
    setSearchQuery({ startDate: startDate, endDate: endDate, categories: selectedCategories })
  }

  const onChangeSelectedCategories = (categories: string[]) => {
    setSearchResult(null)
    setSelectedCategories(categories)
    const { startDate, endDate } = searchQuery
    setSearchQuery({ startDate: startDate, endDate: endDate, categories: categories })
  }

  const onClickSearch = () => {
    setLoading(true)
    searchByDateCategory(searchQuery)
      .then(
        res => {
          setSearchResult(sortByDate(res as ExpenseData[]))
        },
        error => {
          console.log(error)
        }
      )
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <SearchWrapper>
      <h1>검색</h1>
      <DateFilterTab onSelectDateFilter={onSelectDateFilter} />
      <CategoryFilter
        selectedCategories={selectedCategories}
        onChangeSelectedCategories={onChangeSelectedCategories}
      />
      <ButtonWrapper>
        <SearchButton onClick={onClickSearch}>
          <AiOutlineSearch />
          검색
        </SearchButton>
      </ButtonWrapper>

      {loading && <div>검색중....</div>}
      {searchResult ? (
        searchResult.length !== 0 ? (
          <SearchResult results={searchResult} />
        ) : (
          <div>검색 결과가 없습니다.</div>
        )
      ) : null}
    </SearchWrapper>
  )
}

const SearchWrapper = styled.main`
  width: 100%;
  padding: 20px;

  h1 {
    font-size: 24px;
    font-weight: 700;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const SearchButton = styled.button`
  margin-top: 40px;
  border-radius: 44px;
  padding: 0 30px;
  font-size: 20px;
  line-height: 44px;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
