import { styled } from 'styled-components';
import List from '../common/List';
import React, { useEffect, useState } from 'react';
import PostModal from './PostModal';
import { IContent, getCalendar } from '../../lib/API';

interface IReadProps {
  selectedDate: string;
}

function Read({ selectedDate }: IReadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<IContent[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const handleModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  useEffect(() => {
    (async () => {
      // setDate(selectedDate);
      const res = await getCalendar(
        date.getFullYear(),
        date.getMonth() + 1,
        'user123'
      );
      console.log('res:', res);

      if (res[date.getDate().toString()]) {
        setContent(res[date.getDate().toString()]);
      }
    })();
  }, []);

  return (
    <Container>
      <DateContain>
        <StDate>
          {date.getDate()}일 &nbsp;
          {
            ['일', '월', '화', '수', '목', '금', '토'].filter(
              (i, index) => index == date.getDay()
            )[0]
          }
          요일
        </StDate>
      </DateContain>
      <Wrap>
        <WrapP>총 {content.length}건</WrapP>
        <WrapBtn type="button" onClick={handleModal}>
          +
        </WrapBtn>
      </Wrap>
      <ListWrap>
        <List data={content} />
      </ListWrap>
      {isModalOpen && (
        <PostModal
          selectedDate={selectedDate}
          setIsModalOpen={setIsModalOpen}
        />
      )}
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
  padding: 0 30px;
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
  width: 50px;
  height: 50px;
  background-color: #4464ff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  font-size: 25px;
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
