import styled from 'styled-components'
import { useState, FormEvent, ChangeEvent } from 'react'
import { Calendar } from 'types/index'
import { Input, Modal } from 'components/index'
import { useStore } from '@/store'

type UpdateModalProps = {
  closeModal: () => void
  expense: Calendar
  onUpdate: (updatedExpense: Calendar) => void
}

export const UpdateModal = ({ closeModal, expense, onUpdate }: UpdateModalProps) => {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const userData = useStore(state => state.userData)
  const userId = userData.email ?? ''

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 업데이트 데이터
    const updatedExpense = {
      _id: expense._id,
      amount: category === '입금' ? parseInt(amount) : -parseInt(amount),
      category,
      userId,
      date: expense.date
    }

    // 응답이 성공적이면 input창을 초기화하고 modal을 닫음
    onUpdate(updatedExpense)
    setAmount('')
    setCategory('')
    closeModal()
  }

  return (
    <Modal closeModal={closeModal}>
      <EditForm
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}>
        {/* 금액 수정란 */}
        <label htmlFor="amount">금액 : </label>
        <CustomInput
          type="number"
          id="amount"
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
          placeholder="금액을 입력하세요"
          required
        />
        <br />
        {/* 카테고리 수정란 */}
        <label htmlFor="category">카테고리 : </label>
        <CategorySelect
          id="category"
          value={category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
          required>
          <option value="">-- 선택하세요 --</option>
          <option value="입금">입금</option>
          <option value="식비">식비</option>
          <option value="교통비">교통비</option>
          <option value="쇼핑">쇼핑</option>
          <option value="의료">의료</option>
          <option value="공과금">공과금</option>
          <option value="여가">여가</option>
          <option value="기타">기타</option>
        </CategorySelect>
        <button type="submit">수정</button>
      </EditForm>
    </Modal>
  )
}

const EditForm = styled.form`
  min-width: 240px;

  button {
    margin-top: 20px;
    outline: none;
    border: none;
    height: 40px;
    background-color: #7b68ee;
    color: var(--color-white);
    border-radius: 4px;
  }

  select {
    -webkit-appearance: none;
    appearance: none;
  }
`

const CustomInput = styled(Input)`
  margin-top: 5px;
  border-radius: 4px;
`

const CategorySelect = styled.select`
  width: 100%;
  margin-top: 5px;
  padding: 1rem 0.75rem;
  margin-bottom: 5px;
  border: 1px solid #a1a1a1;
  border-radius: 4px;
  cursor: pointer;

  background-image: url('caret-down.svg');
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: calc(100% - 8px) center;

  &:focus {
    outline: none;
  }
`
