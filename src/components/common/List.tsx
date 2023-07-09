import { styled } from 'styled-components';
import { IContent } from '../../lib/API';
import { formatDate } from '../../lib/CommonFunc';

interface IListProps {
  data: IContent[];
}

function List({ data }: IListProps) {
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
              <EditBtn>수정</EditBtn>|<DeleteBtn>삭제</DeleteBtn>
            </Btns>
            <Date>{formatDate(el.date)}</Date>
          </ItemRight>
        </StyledItem>
      ))}
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
