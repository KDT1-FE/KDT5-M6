import { styled } from 'styled-components';
import Calendar from './Calendar';
import Chart from './Chart';
import Stats from './Stats';
import MiddleLayout from '../common/MiddleLayout';
import { useState } from 'react';

//toggle prop을 toggled로 변경
interface IMiddleProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  toggle: boolean;
}

function Middle({ selectedDate, setSelectedDate, toggle }: IMiddleProps) {
  const [date, setDate] = useState(new Date());
  return (
    <MidContainer>
      <TopArea>
        <Stats />
      </TopArea>
      <BottomArea>
        <MiddleLayout date={date} setDate={setDate}>
          {toggle ? (
            <Calendar
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          ) : (
            <Chart date={date} setDate={setDate} />
          )}
        </MiddleLayout>
      </BottomArea>
    </MidContainer>
  );
}

const MidContainer = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: red;
`;
const TopArea = styled.div`
  background-color: pink;
  height: 20vh;
`;
const BottomArea = styled.div`
  background-color: hotpink;
  height: 80vh;
`;

export default Middle;
