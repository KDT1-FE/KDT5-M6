import { styled } from 'styled-components';
import { IContentExtend, delData } from '../../lib/API';
import { formatDate } from '../../lib/CommonFunc';
import { useState } from 'react';
import EditModal from '../Right/EditModal';
import { theme } from '../../styles/theme';

interface IListProps {
  data: IContentExtend[];
  selectedDate: string;
  getContent: () => void; //일반함수 props
}

function List({ data, selectedDate, getContent }: IListProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  console.log('data:', data);
  const deletehandle = (e: React.MouseEvent, _id: string) => {
    e.preventDefault;
    const res = delData(_id);
    res.then(() => {
      getContent();
      alert('삭제가 완료되었습니다!');
    });
    return res;
  };
  const openEditModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setEditModalOpen(true);
    console.log('edit');
  };

  return (
    <Wrap>
      {data.map((el, index) => (
        <StyledItem key={index}>
          <ItemLeft>
            <LeftWrap>
              {el.amount < 0 ? (
                <MinusAmount>{el.amount}</MinusAmount>
              ) : (
                <PlusAmount>+{el.amount}</PlusAmount>
              )}
              <Category>{el.category}</Category>
            </LeftWrap>
          </ItemLeft>
          <ItemRight>
            <Btns>
              <EditBtn onClick={openEditModal}>수정</EditBtn>|
              <DeleteBtn
                onClick={(e: React.MouseEvent) => deletehandle(e, el._id)}
              >
                삭제
              </DeleteBtn>
            </Btns>
            <Date>{formatDate(el.date)}</Date>
          </ItemRight>
        </StyledItem>
      ))}
      {editModalOpen && (
        <EditModal
          setEditModalOpen={setEditModalOpen}
          selectedDate={selectedDate}
        />
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-family: 'poppins';
  font-weight: 500;
`;
const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 110px;
  border-radius: 40px;
  background-color: ${theme.colors.gray[2]};
  box-shadow:
    0 5px 10px ${theme.colors.black.black30},
    -5px -5px 5px ${theme.colors.white};
`;
const ItemLeft = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  align-items: center;
`;
const LeftWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  gap: 10px;
`;
const ItemRight = styled.div`
  height: 100%;
  width: 40%;
  padding-right: 30px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 5px;
`;
const Btns = styled.div`
  color: ${theme.colors.gray[1]};
  font-weight: 800;
`;
const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.gray[1]};
  font-weight: bold;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.gray[1]};
  cursor: pointer;
  font-weight: 500;
`;
const Date = styled.span`
  color: ${theme.colors.gray[1]};
  font-size: 15px;
`;
const MinusAmount = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  word-spacing: -1em;
  color: ${theme.colors.red};
`;
const PlusAmount = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  word-spacing: -1em;
  color: #4464ff;
`;
const Category = styled.span`
  color: ${theme.colors.gray[1]};
  font-weight: 500;
`;

export default List;
