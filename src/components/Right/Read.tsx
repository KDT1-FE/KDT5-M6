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
      'toy2_team4'
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

  const days = ['sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Container>
      <DateContain>
        <StDate>
          {date.getDate()}
          <Num>일 .</Num>&nbsp;
          {days[date.getDay()]}
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
  height: 10%;
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StDate = styled.p`
  margin: 25px;
  font-family: 'poppins';
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  word-spacing: -0.1em;
  color: ${theme.colors.black.black100};
`;
const Num = styled.span`
  font-family: 'Noto sans KR';
  font-size: 1.4rem;
`;
const Wrap = styled.div`
  display: flex;
  margin: 10px 10px;
  justify-content: space-between;
  align-items: end;
  padding: 0 30px;
`;
const WrapP = styled.p`
  width: 120px;
  font-size: 0.8rem;
  text-align: left;
  font-weight: 500;
  color: ${theme.colors.black.black50};
`;
const ListWrap = styled.div`
  height: 67%;
  width: 100%;
  overflow-y: scroll;
`;
const PlusBtn = styled.button`
  z-index: 1;
  width: 90%;
  height: 60px;
  margin-bottom: 30px;
  border-radius: 25px;
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

export default Read;
