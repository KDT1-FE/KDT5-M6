import { styled } from 'styled-components';
import List from '../common/List';
import React, { useState } from 'react';
import PostModal from './PostModal';

function Read() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  // 테스트용 임시 데이터
  const contents = [
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    },
    {
      amount: '+100,000',
      userId: 'user123',
      category: '로또 당첨',
      date: '2023-07-01T10:30:00.000Z'
    }
  ];

  return (
    <Container>
      <DateContain>
        <StDate>1일 토요일</StDate>
      </DateContain>
      <Wrap>
        <WrapP>총 4건</WrapP>
        <WrapBtn type="button" onClick={handleModal}>
          +추가하기
        </WrapBtn>
      </Wrap>
      <ListWrap>
        <List data={contents} />
      </ListWrap>
      {isModalOpen && <PostModal setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
}
const Container = styled.div`
  background-color: #ffffff;
  height: 100%;
  width: 100%;
`;
const DateContain = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StDate = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 52px;
  letter-spacing: -0.03em;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  height: 8%;
  align-items: center;
`;
const WrapP = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  width: 120px;
  justify-content: center;
  font-weight: bold;
  color: #a8b1ce;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.25);
`;
const WrapBtn = styled.button`
  width: 120px;
  height: 50px;
  background-color: #4464ff;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  &:active {
    background-color: #2c3d8f;
  }
  cursor: pointer;
`;
const ListWrap = styled.div`
  height: 66%;
  overflow-y: scroll;
`;

export default Read;
