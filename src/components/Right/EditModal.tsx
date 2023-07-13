import { styled } from 'styled-components';
import BlueInput from '../common/BlueInput';
import { Switch } from 'antd';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import { IContent, editData, IContentExtend } from '../../lib/API';

interface IEditModalProps {
  getContent: () => void;
  selectedDate: string;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: IContentExtend[];
  id: string;
  date: string;
}

function EditModal({
  selectedDate,
  setEditModalOpen,
  data,
  getContent,
  id,
  date
}: IEditModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState<IContent>({
    amount: 0,
    userId: 'user123',
    category: '',
    date: date
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    {
      isChecked
        ? await editData(id, {
            ...form,
            amount: -form.amount,
            category: form.category
          })
        : await editData(id, form);
      getContent();
      alert('내역이 수정되었습니다!');
    }
    setEditModalOpen(false);
  };
  console.log('form:', form);

  return (
    <ModalContainer
      onClick={() => {
        setEditModalOpen(false);
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
            placeholder="금액을 기입해 주세요"
            required
            $middle="true"
            onChange={handleChange}
            value={form.amount === 0 || isNaN(form.amount) ? '' : form.amount}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              (event.currentTarget.value = event.currentTarget.value.replace(
                /[^0-9]/g,
                ''
              ))
            }
          />
          <Switch
            style={{
              fontFamily: 'Noto Sans KR',
              backgroundColor: isChecked
                ? `${theme.colors.red}`
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
        <ContentWrapper>
          <Title>내용</Title>
          <BlueInput
            placeholder="수입/지출 내역을 작성해주세요."
            name="category"
            required
            $large="true"
            onChange={handleChange}
            value={form.category}
          />
        </ContentWrapper>
        <AddButton>수정하기</AddButton>
      </ModalWrapper>
    </ModalContainer>
  );
}
const ModalContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: ${theme.colors.black.black50};
  z-index: 9;
`;

const ModalWrapper = styled.form`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  gap: 20px;
  width: 500px;
  height: 350px;
  margin: auto;
  padding: 30px 50px;
  display: flex;
  position: absolute;
  border-radius: 20px;
  flex-direction: column;
  justify-content: center;
  background-color: ${theme.colors.white};
  font-family: 'poppins', 'Noto Sans KR';
  box-shadow: 4px 4px 20px ${theme.colors.black.black30};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: 700;
  margin-left: 10px;
`;

const Date = styled.span`
  font-weight: 500;
  font-size: 0.8rem;
  font-family: 'poppins';
  color: ${theme.colors.black.black50};
`;

const SwitchWrapper = styled.div`
  gap: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  gap: 15px;
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  font-weight: 600;
  align-self: center;
  align-items: center;
  border-radius: 30px;
  justify-content: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue.main};
  &:focus {
    color: ${theme.colors.gray[2]};
    background-color: ${theme.colors.gray[1]};
  }
`;
export default EditModal;
