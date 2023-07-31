import React, { useState } from 'react'

import { CategoryFilterModal } from 'components/index'
import { styled } from 'styled-components'

type CategoryFilterProps = {
  selectedCategories: string[]
  onChangeSelectedCategories: (categories: string[]) => void
}

export const CategoryFilter = React.memo(
  ({ selectedCategories, onChangeSelectedCategories }: CategoryFilterProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const openModalHandler = () => {
      setIsOpen(!isOpen)
    }

    return (
      <div>
        <CategoryWrapper>
          <p>카테고리</p>
          {selectedCategories.length === 7 ? (
            <CategoryButton onClick={() => setIsOpen(true)}>전체 카테고리</CategoryButton>
          ) : (
            <CategoryButton onClick={() => setIsOpen(true)}>
              {selectedCategories.join(' / ')}
            </CategoryButton>
          )}
        </CategoryWrapper>
        {isOpen ? (
          <CategoryFilterModal
            selectedCategories={selectedCategories}
            onChangeSelectedCategories={onChangeSelectedCategories}
            onCloseModal={openModalHandler}
          />
        ) : null}
      </div>
    )
  }
)

const CategoryWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 18px;

  p {
    padding: 0 5px;
    line-height: 36px;
    color: #555;
  }
`

const CategoryButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--color-primary);
  font-weight: 700;
  font-size: 18px;
  line-height: 36px;
`
