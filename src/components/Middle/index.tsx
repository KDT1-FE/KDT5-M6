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
            <Chart date={date} setDate={setDate} />
          ) : (
            <Calendar
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        </MiddleLayout>
      </BottomArea>
    </MidContainer>
  );
}

const MidContainer = styled.section`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background-color: blue; */
`;
const TopArea = styled.div`
  height: 20vh;
  width: 100%;
  /* background-color: pink; */
`;
const BottomArea = styled.div`
  height: 750px;
  width: 100%;
  /* background-color: hotpink; */
`;

export default Middle;
