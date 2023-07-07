import { Switch } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import { IContent, postData } from '../../lib/API';
import BlueInput from '../common/BlueInput';

interface IPostModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostModal({ setIsModalOpen }: IPostModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState<IContent>({
    amount: 0,
    userId: 'test1234',
    category: '',
    date: ''
  });

  // 제출 함수
  // check 해체(지출) 상태면 amount를 음수로 변환해 제출
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    {
      isChecked ? postData({ ...form, amount: -form.amount }) : postData(form);
    }
    setIsModalOpen(false);
  };

  // input에 입력된 내용을 form
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  return (
    <ModalContainer
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(event);
      }}
    >
      <Title>금액</Title>
      <SwitchWrapper>
        <AmountInput
          type="number"
          name="amount"
          value={form.amount === 0 || isNaN(form.amount) ? '' : form.amount}
          onChange={handleChange}
          placeholder="금액을 기입해 주세요"
          required
          middle="true"
        />
        <Switch
          style={{
            backgroundColor: isChecked ? '#C62F2F' : '#4464FF'
          }}
          checkedChildren="지출"
          unCheckedChildren="수입"
          checked={isChecked}
          onClick={() => {
            setIsChecked((prev) => !prev);
          }}
        />
      </SwitchWrapper>
      <Title>내용</Title>
      <ContentInput
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="수입/지출 내역을 작성해주세요."
        required
        large="true"
      />

      <AddButton type="submit">추가하기</AddButton>
    </ModalContainer>
  );
}

const ModalContainer = styled.form`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 20px;
  width: 450px;
  margin: auto;
  height: 300px;
  padding: 20px;
  display: flex;
  position: absolute;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
`;

const Title = styled.span`
  font-weight: 700;
`;

const SwitchWrapper = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountInput = styled(BlueInput)`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ContentInput = styled(BlueInput)``;

const AddButton = styled.button`
  width: auto;
  height: 40px;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 20px;
  background-color: #4464ff;

  :focus {
    color: #6a6e83;
    background-color: #a8b1ce;
  }
`;

export default PostModal;
