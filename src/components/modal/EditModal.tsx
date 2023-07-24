import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import { putEditConsume } from "../../lib/api/consumeAPI";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import moment from "moment";

interface IEditModalProps {
  id: string;
  amount: number;
  userId: string;
  category: string;
  date: any;
  handleCloseModal: () => void;
}

function EditModal({
  id,
  amount,
  userId,
  category,
  date,
  handleCloseModal,
}: IEditModalProps) {
  const [editAmount, setEditAmount] = useState<number>(amount);
  const [editUserId, setEditUserId] = useState<string>(userId);
  const [editCategory, setEditCategory] = useState<string>(category);
  const [editDateValue, setEditDateValue] = useState<string>(
    date ? date.slice(0, 10) : "",
  );
  const [editTimeValue, setEditTimeValue] = useState<string>(
    date ? moment(date).format("HH:mm") : "",
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "amount") {
      if (!isNaN(Number(value))) {
        setEditAmount(+value);
      }
    } else if (name === "userId") {
      setEditUserId(value);
    } else if (name === "category") {
      setEditCategory(value);
    } else if (name === "date") {
      setEditDateValue(value);
    } else if (name === "time") {
      setEditTimeValue(value);
    }
  };

  const handleConvert = (operator: any) => {
    if (isNaN(editAmount)) {
      setEditAmount(0);
      return;
    }
    if (operator === "+") {
      setEditAmount(Math.abs(editAmount));
    } else if (operator === "-") {
      setEditAmount(-Math.abs(editAmount));
    }
  };

  const handleConfirm = () => {
    const editedConsume = {
      id: id,
      amount: editAmount,
      userId: editUserId,
      category: editCategory,
      date: moment(
        editDateValue + (editTimeValue ? " " + editTimeValue : ""),
      ).format(),
    };

    if (
      editedConsume.amount === 0 ||
      editedConsume.userId === "" ||
      editedConsume.category === "" ||
      editedConsume.date === ""
    ) {
      alert("빈칸을 모두 입력해주세요");
      return;
    }

    putEditConsume({
      id: editedConsume.id,
      amount: editedConsume.amount,
      userId: editedConsume.userId,
      category: editedConsume.category,
      date: editedConsume.date,
    });
    handleCloseModal();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>내역 수정</ModalTitle>
            <ModalCloseButton onClick={handleCloseModal}>
              <FiX />
            </ModalCloseButton>
          </ModalHeader>
          <ModalForm>
            <ModalAmountWrap>
              <ModalAmountBtn type="button" onClick={() => handleConvert("+")}>
                <FiPlus />
              </ModalAmountBtn>

              <ModalAmountBtn type="button" onClick={() => handleConvert("-")}>
                <FiMinus />
              </ModalAmountBtn>

              <ModalInputAmount
                name="amount"
                value={editAmount}
                onChange={handleChange}
                placeholder="금액"
                required
              />
              <span>원</span>
            </ModalAmountWrap>
            <ModalInput
              type="text"
              name="userId"
              value={editUserId}
              onChange={handleChange}
              placeholder="이름"
              required
            />
            <ModalInput
              type="text"
              name="category"
              value={editCategory}
              onChange={handleChange}
              placeholder="카테고리"
              required
            />
            <ModalInput
              type="date"
              name="date"
              placeholder="날짜"
              value={editDateValue}
              onChange={handleChange}
              required
            />
            <ModalInput
              type="time"
              name="time"
              placeholder="시간"
              value={editTimeValue}
              onChange={handleChange}
              required
            />
            <ModalButtonContainer>
              <ModalButton type="button" onClick={handleCloseModal}>
                취소
              </ModalButton>
              <ModalButton type="submit" onClick={handleConfirm}>
                확인
              </ModalButton>
            </ModalButtonContainer>
          </ModalForm>
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
  color: #000;
  font-size: 2rem;
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
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ModalCloseButton = styled.button`
  position: absolute;
  top: -5px;
  right: -10px;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0);
  color: #000;
`;
const ModalAmountWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const ModalAmountBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: #000;
`;
const ModalInput = styled.input`
  height: 30px;
  border-style: none;
  border-bottom: 1px solid #000;
  font-size: 1rem;
`;
const ModalInputAmount = styled.input`
  height: 30px;
  border-style: none;
  border-bottom: 1px solid #000;
  font-size: 1.5rem;
  text-align: right;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: #000;
`;

export default EditModal;
