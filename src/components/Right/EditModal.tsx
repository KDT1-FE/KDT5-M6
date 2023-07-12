import { styled } from 'styled-components';
import BlueInput from '../common/BlueInput';
import { Switch } from 'antd';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import { IContent, editData } from '../../lib/API';

interface IEditModalProps {
  selectedDate: string;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditModal({ selectedDate, setEditModalOpen }: IEditModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState<IContent>({
    amount: 0,
    userId: 'user123',
    category: '',
    date: selectedDate
  });

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
        setEditModalOpen(false);
      }}
    >
      <ModalWrapper
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
        }}
      >
        <TitleWrapper>
          <Title>금액</Title>
          <Date>{selectedDate.split('T')[0]}</Date>
        </TitleWrapper>
        <SwitchWrapper>
          <AmountInput
            type="number"
            name="amount"
            placeholder="금액을 기입해 주세요"
            required
            middle="true"
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
        <ContentInput
          placeholder="수입/지출 내역을 작성해주세요."
          required
          large="true"
          onChange={handleChange}
        />
        <AddButton>수정하기</AddButton>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.form`
  width: 450px;
  height: 300px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
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
export default EditModal;
