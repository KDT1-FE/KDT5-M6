import React, { useState, useRef } from 'react';
import ExpensesAmount from './ExpensesAmount';
import ExpensesTag from './ExpensesTag';
import DepositTag from './DepositTag';
import PaymentMethod from './PaymentMethod';
import { numeric } from '@/lib/utils/Numeric';
import { createdExpense } from '@/lib/api/Api';
import { styled, css } from 'styled-components';
import { theme } from '@/styles/theme';
import { FaArrowLeft } from 'react-icons/fa';

interface AddModalProps {
  close: () => void;
  onItemUpdated?: () => void;
}

function AddModal({ close, onItemUpdated }: AddModalProps) {
  const [type, setType] = useState<string | undefined>(''); // 입금/지출 form
  const [amount, setAmount] = useState(0); // 소비 금액
  const [tag, setTag] = useState(''); // 카테고리 소비 태그
  const [paymentMethod, setPaymentMethod] = useState(''); // 결제 방식
  const [activeButton, setActiveButton] = useState(''); // 버튼 활성화 상태 확인
  const today = new Date().toISOString().slice(0, 10);
  const [selectDate, setSelectDate] = useState(today);
  const modalRef = useRef(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const formType = e.currentTarget.dataset.formType; // 데이터셋을 이용한 타입 지정
    setType(formType); // 지정된 타입을 type값으로
    setActiveButton(formType || ''); // 지정된 type에 따라 버튼 활성화
  };

  // numeric
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAmount(numeric(input));
  };

  const handleTagChange = (tags: string) => {
    setTag(tags);
  };

  const handleMethodChange = (tags: string) => {
    setPaymentMethod(tags);
  };

  const handleSubmit = async () => {
    // type이 expense일 때 amount가 음수로 서버에 데이터에 전달되게
    let formAmount = amount;
    if (type === 'expense') {
      formAmount = -amount;
    }
    // category에 소비 태그 값이 있고, paymentMethod값이 있을 때 카테고리에 추가
    let category = tag;
    if (paymentMethod) {
      category += `, ${paymentMethod}`;
    }

    const data = {
      amount: formAmount,
      category: category,
      date: new Date(selectDate).toString(),
    };

    await createdExpense(data);
    if (onItemUpdated) {
      onItemUpdated();
    }
    close();
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSelectDate(input);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) close();
  };

  return (
    <Container>
      <AddModalWraaper ref={modalRef} onClick={handleClick}>
        <Modal>
          <BackButton onClick={close}>
            <FaArrowLeft />
          </BackButton>
          <StyleDateLabel htmlFor="dateInput">날짜 선택</StyleDateLabel>
          <StyleDate
            type="date"
            id="dateInput"
            required
            value={selectDate}
            onChange={handleDate}
          />
          <ButtonCotainer>
            {/*입금 버튼*/}
            <DepositButton
              $green="true"
              data-form-type="deposit" // 데이터셋을 이용해서 type지정
              $active={activeButton === 'deposit'}
              onClick={handleButtonClick}
            >
              입금
            </DepositButton>
            {/*지출 버튼*/}
            <ExpenseButton
              $red="ture"
              data-form-type="expense"
              $active={activeButton === 'expense'}
              onClick={handleButtonClick}
            >
              지출
            </ExpenseButton>
          </ButtonCotainer>
          <ExpensesAmount
            amount={amount}
            handleAmountChange={handleAmountChange}
          />
          {type === 'deposit' ? (
            <DepositTag handleTagChange={handleTagChange} />
          ) : type === 'expense' ? (
            <ExpensesTag handleTagChange={handleTagChange} />
          ) : null}
          {type === 'deposit' ? null : type === 'expense' ? (
            <PaymentMethod handleMethodChange={handleMethodChange} />
          ) : null}
          <Submit onClick={handleSubmit}>확인</Submit>
        </Modal>
      </AddModalWraaper>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const BackButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;
  position: relative;
  left: -150px;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const StyleDateLabel = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const StyleDate = styled.input`
  width: 50%;
  text-align: center;
`;

const ButtonCotainer = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;
  margin: 10px;
`;

const DepositButton = styled.button<{
  $green?: string;
  $active?: boolean;
}>`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$green &&
    css`
      &:hover {
        background-color: ${theme.colors.green};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #b9fad9, transparent);
      }
    `}

  ${(props) =>
    props.$active &&
    css`
      background-color: ${theme.colors.green};
      color: #ffffffdb;
      background-image: linear-gradient(315deg, #b9fad9, transparent);
    `}
`;

const ExpenseButton = styled.button<{
  $red?: string;
  $active?: boolean;
}>`
  width: 100px;
  height: 30px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all ease 1s 0s;

  ${(props) =>
    props.$red &&
    css`
      &:hover {
        background-color: ${theme.colors.red};
        color: #ffffffdb;
        background-image: linear-gradient(315deg, #e6b0c3, transparent);
      }
    `}

  ${(props) =>
    props.$active &&
    css`
      background-color: ${theme.colors.red};
      color: #ffffffdb;
      background-image: linear-gradient(315deg, #e6b0c3, transparent);
    `}
`;

const Submit = styled.button`
  width: 250px;
  height: 50px;
  margin: 10px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #33ff99;
    color: #ffffffdb;
  }
`;

const AddModalWraaper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;
export default AddModal;
