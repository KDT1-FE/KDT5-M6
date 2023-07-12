import { styled } from 'styled-components';
import List from '../common/List';
import React, { useEffect, useState } from 'react';
import PostModal from './PostModal';
import { IContentExtend, getCalendar } from '../../lib/API';
import { theme } from '../../styles/theme';

interface IReadProps {
  selectedDate: string;
}

function Read({ selectedDate }: IReadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<IContentExtend[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const handleModal = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedDate) {
      const a = new Date(selectedDate.split('T')[0]);
      setDate(a);
    }
  }, [selectedDate]);

  const getContent = async () => {
    const res = await getCalendar(
      date.getFullYear(),
      date.getMonth() + 1,
      'user123'
    );
    console.log('res:', res);

    if (res[date.getDate()]) {
      setContent(res[date.getDate()]);
    } else {
      setContent([]);
    }
  };

  useEffect(() => {
    getContent();
  }, [date]);

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <Container>
      <DateContain>
        <StDate>
          {date.getDate()}일 &nbsp;
          {days[date.getDay()]}
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
        <List
          data={content}
          selectedDate={selectedDate}
          getContent={getContent}
        />
      </ListWrap>
      {isModalOpen && (
        <PostModal
          getContent={getContent}
          selectedDate={selectedDate}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: ${theme.colors.white};
`;
const DateContain = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StDate = styled.p`
  margin: 25px;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 500;
  word-spacing: -0.1em;
`;
const Wrap = styled.div`
  height: 5%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 30px;
`;
const WrapP = styled.p`
  width: 120px;
  margin-left: 20px;
  font-size: 1rem;
  text-align: left;
  font-weight: 500;
  color: ${theme.colors.black.black50};
`;
const WrapBtn = styled.button`
  z-index: 3;
  position: absolute;
  right: 35px;
  bottom: 120px;
  width: 80px;
  height: 80px;
  border: none;
  border-radius: 50%;
  font-size: 3rem;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue.main};
  box-shadow: 0px 0px 10px ${theme.colors.blue.main};
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    box-shadow: 5px 5px 20px ${theme.colors.blue.main};
  }
`;
const ListWrap = styled.div`
  height: 65%;
  width: 95%;
  margin: auto;
  margin-top: 10px;
  overflow-y: scroll;
`;

export default Read;
