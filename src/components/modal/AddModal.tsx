import React, { useState } from "react";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";
import { postConsume } from "../../lib/api/consumeAPI";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";
import moment from "moment"

interface IAddModalProps {
  handleCloseModal: () => void;
}

function AddModal({ handleCloseModal }: IAddModalProps) {
  const [amount, setAmount] = useState<number>(0);
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");
  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    if (name === "amount") {
      if (!isNaN(Number(value))) {
        setAmount(+value);
      }
    } else if (name === "userId") {
      setUserId(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleConvert = (operator: any) => {
    if (isNaN(amount)) {
      setAmount(0);
      return;
    }
    if (operator === "+") {
      setAmount(Math.abs(amount));
    } else if (operator === "-") {
      setAmount(-Math.abs(amount));
    }
  };

  const handleTimeChange = (value: any) => {
    setTimeValue(value);
  };

  const handleConfirm = (event: any) => {
    event.preventDefault();
    const date = moment(
      dateValue + (timeValue ? " " + timeValue : ""),
    ).format();

    if (userId === "" || category === "" || date === "") {
      alert("빈칸을 모두 입력해주세요.");
      return;
    } else if (amount < 1 && amount > -1) {
      alert("금액을 입력하세요.");
      return;
    }

    postConsume({
      amount,
      userId,
      category,
      date,
    });
    handleCloseModal();
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>내역 추가</ModalTitle>
            <ModalCloseButton onClick={handleCloseModal}>
              <FiX />
            </ModalCloseButton>
          </ModalHeader>
          <ModalForm onSubmit={handleConfirm}>
            <ModalAmountWrap>
              <ModalAmountBtn type="button" onClick={() => handleConvert("+")}>
                <FiPlus />
              </ModalAmountBtn>

              <ModalAmountBtn type="button" onClick={() => handleConvert("-")}>
                <FiMinus />
              </ModalAmountBtn>

              <ModalInputAmount
                name="amount"
                value={amount}
                onChange={handleChange}
                placeholder="금액"
                required
              />
              <span>원</span>
            </ModalAmountWrap>
            <ModalInput
              type="text"
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="이름"
              required
            />
            <ModalInput
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
              placeholder="카테고리"
              required
            />
            <ModalInput
              type="date"
              name="date"
              placeholder="날짜"
              value={dateValue}
              onChange={(event: any) => setDateValue(event.target.value)}
              required
            />
            <ModalInput
              type="time"
              name="time"
              placeholder="시간"
              value={timeValue}
              onChange={(event: any) => handleTimeChange(event.target.value)}
              required
            />
            <ModalButtonContainer>
              <ModalButton type="button" onClick={handleCloseModal}>
                취소
              </ModalButton>
              <ModalButton type="submit">확인</ModalButton>
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
  background-color: rgba(0, 0, 0, 0.5);
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

export default AddModal;
