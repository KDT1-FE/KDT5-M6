import styled from 'styled-components'
import { theme } from 'style/index'

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
const ModalContent = styled.div`
  display: flex;
  background-color: #fff;
  /* padding: 30px; */
  line-height: 45px;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
  @media ${theme.desktop} {
    width: 800px;
    padding: 50px;
  }
  @media ${theme.laptop} {
    width: 600px;
    padding: 50px;
  }
  @media ${theme.tablet} {
    width: 400px;
    padding: 50px;
  }
  @media ${theme.mobile} {
    width: 200px;
    padding: 30px;
  }
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
`

const ConfirmButton = styled(Button)`
  padding: 3px 15px;
  margin-top: 10px;
`
export const ViewLogs = ({ closeModal, expense }) => {
  const map = new Map()
  map.set('price', '금액 : ')
  map.set('content', '내역 : ')
  map.set('confirm', '확인')

  return (
    <ModalContainer>
      <ModalContent>
        {expense.allDay
          ? `${map.get('price')}${expense.title}`
          : `${map.get('content')}${expense.title}`}
        <ConfirmButton onClick={closeModal}>{map.get('confirm')}</ConfirmButton>
      </ModalContent>
    </ModalContainer>
  )
}
