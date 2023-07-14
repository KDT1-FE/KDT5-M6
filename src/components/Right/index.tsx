import { styled } from 'styled-components';
import { useState } from 'react';
import Read from './Read';
import Search from './Search';
import { theme } from '../../styles/theme';

interface IRightProps {
  selectedDate: string;
  setChange: React.Dispatch<React.SetStateAction<boolean>>;
}

function Right({ selectedDate, setChange }: IRightProps) {
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
      {active ? (
        <Read selectedDate={selectedDate} setChange={setChange} />
      ) : (
        <Search selectedDate={selectedDate} />
      )}
    </RightContainer>
  );
}

const RightContainer = styled.div`
  width: 100%;
  height: 96%;
  background-color: ${theme.colors.blue.main};
  border-radius: 40px;
  box-shadow: 5px 5px 20px ${theme.colors.gray[1]};
  overflow: hidden;
`;
const Btns = styled.div`
  width: 100%;
  height: 9%;
  background-color: ${theme.colors.blue.main};
`;
const BtnActive = styled.button`
  width: 50%;
  height: 100%;
  padding: 10px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 800;
  word-spacing: -0.1em;
  border-radius: 40px 40px 0px 0px;
  background: ${theme.colors.white};
  color: ${theme.colors.blue.main};
  border: none;
`;
const BtnBlur = styled.button`
  height: 100%;
  width: 50%;
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  word-spacing: -0.1em;
  background-color: ${theme.colors.blue.main};
  border: none;
  color: ${theme.colors.gray[2]};
  cursor: pointer;
`;

export default Right;
