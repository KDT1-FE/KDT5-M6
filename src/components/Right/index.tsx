import { styled } from 'styled-components';
import { useState } from 'react';
import Read from './Read';
import Search from './Search';

interface IRightProps {
  selectedDate: string;
}

function Right({ selectedDate }: IRightProps) {
  const [active, setActive] = useState(true);

  return (
    <RightContainer>
      {active ? (
        <Btns>
          <BtnActive onClick={() => setActive(true)}>💰 입출금 내역</BtnActive>
          <BtnBlur onClick={() => setActive(false)}>🔍 전체 내역 검색</BtnBlur>
        </Btns>
      ) : (
        <Btns>
          <BtnBlur onClick={() => setActive(true)}>💰 입출금 내역</BtnBlur>
          <BtnActive onClick={() => setActive(false)}>
            🔍 전체 내역 검색
          </BtnActive>
        </Btns>
      )}
      {active ? <Read selectedDate={selectedDate} /> : <Search />}
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 85%;
  height: 95%;
  background-color: #4464ff;
  border-radius: 40px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;
const Btns = styled.div`
  width: 100%;
  height: 11%;
`;
const BtnActive = styled.button`
  width: 50%;
  height: 100%;
  border: none;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 32px;
  border-radius: 40px 40px 0px 0px;
  background: #ffffff;
  color: #4464ff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
`;
const BtnBlur = styled.button`
  cursor: pointer;
  height: 100%;
  width: 50%;
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 32px;
  background-color: #4464ff;
  border: none;
  color: #cddeff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default Right;
