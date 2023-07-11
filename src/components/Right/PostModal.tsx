import { Switch } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import { IContent, postData } from '../../lib/API';
import BlueInput from '../common/BlueInput';
import { theme } from '../../styles/theme';

interface IPostModalProps {
  selectedDate: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostModal({ selectedDate, setIsModalOpen }: IPostModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState<IContent>({
    amount: 0,
    userId: 'user123',
    category: '',
    date: selectedDate
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
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ModalContainer
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      <ModalWrapper
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(event);
        }}
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <TitleWrapper>
          <Title>금액</Title>
          <Date>{selectedDate.split('T')[0]}</Date>
        </TitleWrapper>
        <SwitchWrapper>
          <BlueInput
            type="number"
            name="amount"
            value={
              form.amount === 0 || isNaN(form.amount) ? undefined : form.amount
            }
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              (event.currentTarget.value = event.currentTarget.value.replace(
                /[^0-9]/g,
                ''
              ))
            }
            onChange={handleChange}
            placeholder="금액을 기입해 주세요"
            required
            $middle="true"
          />
          <Switch
            style={{
              backgroundColor: isChecked
                ? '#C62F2F'
                : `${theme.colors.blue.main}`
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
        <BlueInput
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="수입/지출 내역을 작성해주세요."
          required
          $large="true"
        />

        <AddButton type="submit">추가하기</AddButton>
      </ModalWrapper>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalWrapper = styled.form`
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: 700;
`;

const Date = styled.span`
  font-weight: 700;
`;

const SwitchWrapper = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
