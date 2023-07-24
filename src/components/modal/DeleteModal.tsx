import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import { deleteConsume } from "../../lib/api/consumeAPI";
import { FiX } from "react-icons/fi";

interface IDeleteProps {
  id: string;
  handleCloseModal: () => void;
}

function DeleteModal({ id, handleCloseModal }: IDeleteProps) {
  const handleConfirm = () => {
    const deleteitem = {
      id: id,
    };

    deleteConsume({
      id: deleteitem.id,
    });
    handleCloseModal();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>내역을 삭제하시겠습니까?</ModalTitle>
            <ModalCloseButton onClick={handleCloseModal}>
              <FiX />
            </ModalCloseButton>
          </ModalHeader>
          <ModalButtonContainer>
            <ModalButton type="button" onClick={handleCloseModal}>
              취소
            </ModalButton>
            <ModalButton type="submit" onClick={handleConfirm}>
              확인
            </ModalButton>
          </ModalButtonContainer>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
}

const ModalHeader = styled.div`
  width: 100%;
  height: 50px;
`;
const ModalTitle = styled.h1`
  width: 300px;
  font-size: 1.5rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 2rem;
  z-index: 99999;
`;

const ModalContent = styled.div`
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -5px;
  right: -10px;
  font-size: 2rem;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
`;

export default DeleteModal;
