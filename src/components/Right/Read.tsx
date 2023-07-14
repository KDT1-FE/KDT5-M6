import { styled } from 'styled-components';
import List from '../common/List';
import React, { useCallback, useEffect, useState } from 'react';
import PostModal from './PostModal';
import { IContentExtend, getCalendar } from '../../lib/API';
import { theme } from '../../styles/theme';

interface IReadProps {
  selectedDate: string;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function Read({ selectedDate, setChange }: IReadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<IContentExtend[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  // PostModal 열기
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

  // 선택된 날짜에 대한 내역 불러오기
  const getContent = useCallback(async () => {
    const res = await getCalendar(
      date.getFullYear(),
      date.getMonth() + 1,
      'user123'
    );

    if (res[date.getDate()]) {
      setContent(res[date.getDate()]);
    } else {
      setContent([]);
    }
  }, [date]);

  useEffect(() => {
    getContent();
  }, [date, getContent]);

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
      </Wrap>
      <ListWrap>
        <List
          setChange={setChange}
          data={content}
          selectedDate={selectedDate}
          getContent={getContent}
        />
      </ListWrap>
      <WrapBtn>
        <PlusBtn type="button" onClick={handleModal}>
          추가하기
        </PlusBtn>
      </WrapBtn>
      {isModalOpen && (
        <PostModal
          setChange={setChange}
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
  background-color: ${theme.colors.white};
`;
const DateContain = styled.div`
  width: 100%;
  height: 15%;
  /* padding-top: 20px; */
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
const PlusBtn = styled.button`
  z-index: 1;
  width: 90%;
  height: 60px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue.main};
  box-shadow: 0px 0px 10px ${theme.colors.blue.main};
  cursor: pointer;
  &:hover {
    transition: all 0.3s;
    box-shadow: 5px 5px 20px ${theme.colors.blue.main};
  }
`;
const WrapBtn = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListWrap = styled.div`
  height: 60%;
  width: 100%;
  margin-top: 10px;
  overflow-y: scroll;
`;

export default Read;
