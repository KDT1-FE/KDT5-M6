import React, { useState } from 'react'
import { chartCategory } from 'constants/index'

import { styled } from 'styled-components'
import {
  BiRestaurant,
  BiBus,
  BiCapsule,
  BiCart,
  BiPlug,
  BiJoystick,
  BiMoneyWithdraw
} from 'react-icons/bi'

type CategoryFilterModalProps = {
  selectedCategories: string[]
  onChangeSelectedCategories: (categories: string[]) => void
  onCloseModal: () => void
}

const categoryIcons = new Map()
categoryIcons.set('식비', <BiRestaurant />)
categoryIcons.set('교통비', <BiBus />)
categoryIcons.set('쇼핑', <BiCart />)
categoryIcons.set('여가', <BiJoystick />)
categoryIcons.set('의료/건강', <BiCapsule />)
categoryIcons.set('공과금', <BiPlug />)
categoryIcons.set('기타', <BiMoneyWithdraw />)

export const CategoryFilterModal = React.memo(
  ({ selectedCategories, onChangeSelectedCategories, onCloseModal }: CategoryFilterModalProps) => {
    const [selected, setSelected] = useState<Set<string>>(new Set(selectedCategories))

    const onChangeCheckedCategory = ({ target }: { target: HTMLInputElement }) => {
      if (target.checked) {
        setSelected(new Set([...selected, target.id]))
      } else {
        if (selected.size === 1) {
          alert('카테고리는 1개 이상 필수입니다!')
          return
        }
        setSelected(new Set(Array.from(selected).filter(sc => sc !== target.id)))
      }
    }

    const onClickSave = () => {
      onChangeSelectedCategories(Array.from(selected))
      onCloseModal()
    }

    return (
      <ModalContainer>
        <ModalBackdrop onClick={onCloseModal}>
          <ModalView
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
            }}>
            <h4>필터</h4>
            <ul>
              {chartCategory.map(c => (
                <CategoryItem key={c.category}>
                  <CategoryTag
                    type="checkbox"
                    id={c.category}
                    value={''}
                    bgColor={c.bgColor}
                    borderColor={c.borderColor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeCheckedCategory(e)
                    }
                    checked={selected.has(c.category)}
                  />
                  <label htmlFor={c.category}>
                    <div>{categoryIcons.get(c.category)}</div>
                    <span>{c.category}</span>
                  </label>
                </CategoryItem>
              ))}
            </ul>
            <ConfirmButton onClick={onClickSave}>적용</ConfirmButton>
          </ModalView>
        </ModalBackdrop>
      </ModalContainer>
    )
  }
)

const CategoryItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CategoryTag = styled.input<{ bgColor: string; borderColor: string }>`
  display: none;

  + label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    font-size: 14px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-white);
      font-size: 30px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: ${props => props.bgColor};
    }
  }

  &:checked {
    + label {
      div {
        background-color: ${props => props.borderColor};
      }
    }
  }
`

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  min-width: 200px;
  max-width: calc(70px * 4 + 140px);
  min-height: 100px;
  padding: 20px 40px;
  border-radius: 20px;
  background-color: var(--color-white);

  h4 {
    font-size: 20px;
    font-weight: 700;
  }

  ul {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
`

const ModalBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ConfirmButton = styled.button`
  margin-top: 40px;
  border-radius: 44px;
  padding: 0 30px;
  font-size: 20px;
  line-height: 44px;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
`
