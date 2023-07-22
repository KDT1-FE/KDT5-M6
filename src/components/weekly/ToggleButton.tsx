import { useState } from 'react'
import { UpdateModal, DeleteModal } from '@/components/index'
import { Calendar } from 'types/index'
import { BsTrash, BsPencil } from 'react-icons/bs'

import { useStore } from '@/store'
import { styled } from 'styled-components'

type ToggleButtonProps = {
  expense: Calendar
  index: number
  weekIndex: number
}

type ToggleButtonAction = (value: boolean) => void

let activeToggleButton: ToggleButtonAction | null = null

export const ToggleButton = ({ expense, index, weekIndex }: ToggleButtonProps) => {
  // const [showButtons, setShowButtons] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const removeExpense = useStore(state => state.removeExpense)
  const updateExpense = useStore(state => state.updateExpense)

  // 버튼의 표시 여부를 전환하는 함수
  const handleVision = () => {
    // 버튼은 화면에 1개만 출력
    if (activeToggleButton && activeToggleButton !== handleVision) {
      activeToggleButton(false)
    }
    // // 현재 버튼의 표시 상태를 전환
    // setShowButtons(prevShowButtons => {
    //   if (!prevShowButtons) {
    //     activeToggleButton = setShowButtons
    //   }
    //   return !prevShowButtons
    // })
  }

  //삭제 함수
  const handleDelete = () => {
    removeExpense(weekIndex, index, expense._id)
    setShowDeleteModal(false)
  }

  //수정 함수
  const handleUpdate = (updatedExpense: Calendar) => {
    updateExpense(weekIndex, index, updatedExpense, expense._id)
    setShowUpdateModal(false)
  }

  return (
    <ButtonWrapper>
      <BsPencil onClick={() => setShowUpdateModal(true)} />
      <BsTrash onClick={() => setShowDeleteModal(true)} />
      {/* 수정 모달 창 */}
      {showUpdateModal && (
        <UpdateModal
          closeModal={() => setShowUpdateModal(false)}
          onUpdate={handleUpdate}
          expense={expense}
        />
      )}
      {/* 삭제 확인 모달 창 */}
      {showDeleteModal && (
        <DeleteModal
          closeModal={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 20px;
`
