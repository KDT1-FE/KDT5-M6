import { styled } from 'styled-components';
import { IContent } from '../../lib/API';
import { formatDate } from '../../lib/CommonFunc';

interface IListProps {
  data: IContent;
}

function List({ data }: IListProps) {
  return (
    <StyledList>
      <Date>{formatDate(data.date)}</Date>
      <Amount>{data.amount}</Amount>
      <Category>{data.category}</Category>
    </StyledList>
  );
}

const StyledList = styled.li`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  border: 1px solid;
`;
const Date = styled.span``;
const Amount = styled.span``;
const Category = styled.span``;

export default List;
