import styled from 'styled-components'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  closeModal: () => void
}

export const Modal = ({ children, closeModal }: ModalProps) => {
  //모달 외부 클릭시 닫힘
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <StyledModal onClick={handleOutsideClick}>
      <ModalContent>{children}</ModalContent>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border: 3px solid #a68bfc;
  border-radius: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;

  .goal {
    margin-top: 10px;
    height: 44px;
    border-radius: 4px;
  }

  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }

  .save {
    margin-top: 10px;
    outline: none;
    border: none;
    height: 40px;
    width: 100%;
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: 4px;
  }
`
