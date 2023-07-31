import React from 'react'
import { DeleteExpenseList } from 'src/api/DeleteList'
import { TrashIcon } from '@heroicons/react/outline'
import styled from 'styled-components'

interface DeleteExpenseProps {
  expenseId: string
  onDelete: () => void
}

export const DeleteExpense: React.FC<DeleteExpenseProps> = ({
  expenseId,
  onDelete
}) => {
  const handleDelete = async () => {
    const deleteSuccess = await DeleteExpenseList(expenseId)
    if (deleteSuccess) {
      onDelete()
      alert('삭제 성공')
    } else {
      alert('삭제 실패')
    }
  }

  return (
    <div>
      <DeleteButton onClick={handleDelete}>
        <TrashIcon />
      </DeleteButton>
    </div>
  )
}

const DeleteButton = styled.button`
  text-decoration: none;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: white;
  svg {
    width: 20px;
    &:hover {
      cursor: pointer;
    }
  }
`
