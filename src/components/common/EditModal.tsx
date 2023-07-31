import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { EditExpenseList, Expense } from 'src/api/EditList'

interface EditModalProps {
  closeModal: () => void
  expense: Expense
  onUpdateExpense: (updatedExpense: Expense) => void
}

export const EditModal: React.FC<EditModalProps> = ({
  closeModal,
  expense,
  onUpdateExpense
}) => {
  const [editedExpense, setEditedExpense] = useState<Expense>(expense)
  const [selectAmount, setSelectAmount] = useState(true)
  const [account, setAccount] = useState(editedExpense.category.split('.')[1])

  useEffect(() => {
    setSelectAmount(expense.amount >= 0)
  }, [expense])

  const handleClickAmount = (isExpense: boolean) => {
    setSelectAmount(isExpense)

    setEditedExpense(prevExpense => ({
      ...prevExpense,
      amount: isExpense
        ? Math.abs(prevExpense.amount)
        : -Math.abs(prevExpense.amount)
    }))
  }

  const handleChangeInputEditExpense = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setEditedExpense(prevExpense => ({
      ...prevExpense,
      [name]: value
    }))
  }

  const handleChangeAccountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setAccount(value)
  }

  const handleClickSaveButton = async () => {
    if (editedExpense.date.trim() === '') {
      alert('다시 입력해주세요.')
      return
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    if (!dateRegex.test(editedExpense.date)) {
      alert('올바른 날짜 형식으로 입력해주세요.')
      return
    }

    const amountValue = Number(editedExpense.amount)
    if (isNaN(amountValue)) {
      alert('금액은 숫자만 입력 가능합니다.')
      return
    }

    const updatedExpense = {
      ...editedExpense,
      category: `${editedExpense.category}.${account}`
    }

    const res = await EditExpenseList(editedExpense._id, editedExpense)
    if (typeof res !== 'boolean') {
      closeModal()
      onUpdateExpense(updatedExpense)
      alert('수정 성공')
    } else {
      alert('수정 실패')
    }
  }

  return (
    <ModalContainer>
      <ModalContent>
        <AmountSelect>
          <Title>분류 :</Title>
          <AmountButton
            onClick={() => handleClickAmount(true)}
            className={selectAmount ? 'active' : ''}>
            수입
          </AmountButton>
          <AmountButton
            onClick={() => handleClickAmount(false)}
            className={selectAmount ? '' : 'active'}>
            지출
          </AmountButton>
        </AmountSelect>
        <InputWrapper>
          <Title>금액 :</Title>
          <input
            type="text"
            name="amount"
            value={editedExpense.amount}
            onChange={handleChangeInputEditExpense}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>내역 :</Title>
          <input
            className="account-input"
            name="account"
            type="text"
            value={account}
            onChange={handleChangeAccountInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>날짜 :</Title>
          <input
            type="text"
            name="date"
            value={editedExpense.date}
            onChange={handleChangeInputEditExpense}
          />
        </InputWrapper>
        <InputWrapper>
          <Title>항목 :</Title>
          <select
            name="category"
            onChange={handleChangeInputEditExpense}
            value={editedExpense.category}>
            <option value="카테고리">카테고리</option>
            <option value="식비">식비</option>
            <option value="생활/건강">생활/건강</option>
            <option value="쇼핑">쇼핑</option>
            <option value="교통">교통</option>
            <option value="주거/통신">주거/통신</option>
            <option value="금융">금융</option>
            <option value="문화/여가">문화/여가</option>
            <option value="교육/학습">교육/학습</option>
            <option value="자녀/육아">자녀/육아</option>
            <option value="경조/선물">경조/선물</option>
          </select>
        </InputWrapper>
        <ButtonWrapper>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <SaveButton onClick={handleClickSaveButton}>저장</SaveButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalContainer>
  )
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

const Title = styled.div`
  font-size: 16px;
  margin-right: 10px;
`

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  width: 310px;
  line-height: 45px;
  border-radius: 6px;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  select {
    width: 100px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`

const AmountSelect = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
`

const CancelButton = styled(Button)`
  padding: 3px 15px;
  margin-right: 10px;
`

const SaveButton = styled(Button)`
  background-color: #000;
  padding: 3px 15px;
  color: #fff;
`

const AmountButton = styled(Button)`
  font-size: 15px;
  margin: 2px;
  &.active {
    background-color: #f15441;
    margin: 4px;
    border: none;
    color: #fff;
  }
`
