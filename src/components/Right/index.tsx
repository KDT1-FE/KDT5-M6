import { styled } from 'styled-components';
import List from '../common/List';

function Right() {
  // 테스트용 임시 데이터
  const content = {
    amount: 100,
    userId: 'user123',
    category: 'food',
    date: '2023-07-01T10:30:00.000Z'
  };

  return (
    <RightContainer>
      <List data={content} />
    </RightContainer>
  );
}

const RightContainer = styled.div``;

export default Right;
