import React, { useState, useEffect, useRef } from 'react';
import ExpensesAmount from './ExpensesAmount';
import ExpensesTag from './ExpensesTag';
import DepositTag from './DepositTag';
import PaymentMethod from './PaymentMethod';
import { numeric } from '@/lib/utils/Numeric';
import { updatedRecord, deletedRecord } from '@/lib/api/Api';
import { styled } from 'styled-components';
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import { theme } from '@/styles/theme';

interface UpdateModalProps {
  amount: number;
  category: string;
  date: string;
  _id: string;
  close: () => void;
  onItemUpdated: () => void;
}

// props로 전달받은 amount를 initialAmount로 받음.
function UpdateModal({
  amount: initialAmount,
  category,
  _id,
  date,
  close,
  onItemUpdated,
}: UpdateModalProps) {
  const [type, setType] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(Math.abs(initialAmount)); // porps로 받은 amount값을 렌더링될 때 정수로
  // props로 받은 category의 값이 "소비 태그, 결제 방법" 형식이고 초기 수정폼을 렌더링 할 때
  // 전달 받은 소비 태그와 결제 방법이 렌더링 될 수 있게 split을 이용해서 , 기준으로 배열을 생성
  const splitCategory = category.split(', ');
  const [tag, setTag] = useState<string>(splitCategory[0]);
  const [paymentMethod, setPaymentMethod] = useState<string>(splitCategory[1]);
  const modalRef = useRef(null);

  // useEffect를 사용해서 마운트 될 때 initialAmount가 0보다 크거나 같으면 type은 deposit 아니면 expense가 된다.
  useEffect(() => {
    setType(initialAmount >= 0 ? 'deposit' : 'expense');
  }, [initialAmount]);

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
    const chageData =
      // amount 또는 tag나 paymentMethod의 state초기값이 바뀌는지 확인
      amount !== Math.abs(initialAmount) ||
      tag !== splitCategory[0] ||
      paymentMethod !== splitCategory[1];
    // 변경되는 데이터가 없으면 모달을 닫고 함수를 종료한다.
    if (!chageData) {
      close();
      return;
    }

    // 변경 사항이 있으면 아래 코드들을 실행
    // type이 expense일 때 서버로 전달하는 데이터 amount가 음수가 되게 아니면 정수로
    const formAmount = type === 'expense' ? -amount : amount;

    // paymentMethod가 있으면 category에 paymentMethod의 값을 추가해서 서버로 전달
    let updatedCategory = tag;
    if (paymentMethod) {
      updatedCategory += `, ${paymentMethod}`;
    }

    const data = {
      amount: formAmount,
      category: updatedCategory,
      date: date,
    };

    await updatedRecord(_id, data);
    onItemUpdated();
    close();
  };

  const handleDeleted = async () => {
    await deletedRecord(_id);
    onItemUpdated();
    close();
  };

  // useRef를 사용해서 ModalWrapper를 클릭하게 되면 모달이 닫히게
  const handleRef = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === modalRef.current) close();
  };

  // props로 전달 받은 date값을 변형
  const krDate = new Date(date);
  const year = krDate.getFullYear(); // 연도
  const month = krDate.getMonth() + 1; // 월 (0부터 시작하므로 +1을 해줌)
  const day = krDate.getDate(); // 일
  const creationDate = `${year}년 ${month}월 ${day}일`;

  return (
    <Container>
      <ModalWrapper ref={modalRef} onClick={handleRef}>
        <Modal>
          <ButtonContainer>
            <BackButton onClick={close}>
              <FaArrowLeft />
            </BackButton>
            <DeleteButton onClick={handleDeleted}>
              <FaTrashAlt />
            </DeleteButton>
          </ButtonContainer>
          <DateContainer>{creationDate}</DateContainer>
          <ExpensesAmount
            amount={amount}
            handleAmountChange={handleAmountChange}
          />
          {/* type이 deposit일 때와 expense일 때 삼항연산자를 사용하여 렌더링 되는 컴포넌트 설정 */}
          {type === 'deposit' ? (
            <DepositTag tag={tag} handleTagChange={handleTagChange} />
          ) : (
            <ExpensesTag tag={tag} handleTagChange={handleTagChange} />
          )}
          {/* type이 expense일 때만 PaymentMethod 컴포넌트가 렌더링되게*/}
          {type === 'expense' ? (
            <PaymentMethod
              tag={paymentMethod}
              handleMethodChange={handleMethodChange}
            />
          ) : null}
          <Submit onClick={handleSubmit}>확인</Submit>
        </Modal>
      </ModalWrapper>
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const DeleteButton = styled.button`
  border: none;
  font-size: 20px;
  margin: 15px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    color: ${theme.colors.red};
  }
`;

const DateContainer = styled.div`
  margin-bottom: 10px;
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

const ModalWrapper = styled.div`
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

export default UpdateModal;
