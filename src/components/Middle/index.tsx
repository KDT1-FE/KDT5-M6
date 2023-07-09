import { styled } from 'styled-components';
import Chart from './Chart';
import { useState } from 'react';
import Calendar from './Calendar';
import Stats from './Stats';

interface IMiddleProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

function Middle({ selectedDate, setSelectedDate }: IMiddleProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <MidContainer>
      <TopArea>
        <Stats />
      </TopArea>
      <BottomArea>
        <ToggleButton
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        >
          임시토글버튼
        </ToggleButton>
        {toggle ? (
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <Chart />
        )}
      </BottomArea>
    </MidContainer>
  );
}

const MidContainer = styled.div``;
const TopArea = styled.div``;
const BottomArea = styled.div``;
const ToggleButton = styled.button``;

export default Middle;
