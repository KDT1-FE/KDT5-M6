import { Switch } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import { IContent, postData } from '../../lib/API';
import BlueInput from '../common/BlueInput';

function PostModal() {
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
          type="text"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="금액을 기입해 주세요"
          required
        />
        <Switch
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
      />

      <AddButton type="submit">추가하기</AddButton>
    </ModalContainer>
  );
}

const ModalContainer = styled.form`
  gap: 20px;
  width: 400px;
  height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: antiquewhite;
`;

const Title = styled.span`
  font-weight: 700;
`;

const SwitchWrapper = styled.div`
  align-items: center;
  gap: 20px;
  width: 100%;
  display: flex;
`;

const AmountInput = styled(BlueInput)`
  flex-grow: 1;
`;

const ContentInput = styled(BlueInput)``;

const AddButton = styled.button`
  cursor: pointer;
  width: auto;
  height: 40px;
  color: #fff;
  border-radius: 10px;
  border: none;
  background-color: #4464ff;
`;

export default PostModal;
