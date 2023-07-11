import { styled } from 'styled-components';
import { IContentExtend, delData } from '../../lib/API';
import { formatDate } from '../../lib/CommonFunc';
import { useState } from 'react';
import EditModal from '../Right/EditModal';

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
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: center;
`;
const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fd;
  border: 1px solid;
  width: 90%;
  height: 120px;
  border: none;
  border-radius: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Btns = styled.div`
  color: #a8b1ce;
  font-weight: bold;
`;
const EditBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #a8b1ce;
  font-weight: bold;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #a8b1ce;
  cursor: pointer;
  font-weight: bold;
`;
const Date = styled.span`
  color: #a8b1ce;
  font-size: 15px;
`;
const MinusAmount = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  letter-spacing: -0.03em;
  color: #ff6969;
`;
const PlusAmount = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 29px;
  letter-spacing: -0.03em;
  color: #4464ff;
`;
const Category = styled.span`
  color: #6a6e83;
  font-weight: bold;
`;

export default List;
