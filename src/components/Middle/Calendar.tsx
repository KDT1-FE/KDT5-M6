import { useState } from 'react';
import { styled } from 'styled-components';

interface ICalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

function Calendar({ selectedDate, setSelectedDate }: ICalendarProps) {
  const [date, setDate] = useState(new Date());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleClick = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);
    const offset = clickedDate.getTimezoneOffset() * 60000;
    const formattedDate = new Date(
      clickedDate.getTime() - offset
    ).toISOString();
    setSelectedDate(formattedDate);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const calendar = [];

    // 첫 번째 주 시작 전의 빈 날짜 채우기
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<Empty key={`empty-${i}`}></Empty>);
    }

    // 달력에 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(
        <CalendarDay
          onClick={() => {
            handleClick(year, month, day);
          }}
          key={`day-${day}`}
          isSelected={new Date(selectedDate).getDate() === day}
        >
          {day}
        </CalendarDay>
      );
    }

    return calendar;
  };

  return (
    <CalendarContainer>
      <Title>
        <Prev
          onClick={() => {
            setDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
            );
          }}
        ></Prev>
        <h2>
          {date.getMonth().toString().padStart(2, '0')}. {date.getFullYear()}
        </h2>
        <Next
          onClick={() => {
            setDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
            );
          }}
        ></Next>
      </Title>
      <CalendarHeader>
        {daysOfWeek.map((day) => (
          <CalendarDay key={day}>{day}</CalendarDay>
        ))}
      </CalendarHeader>
      <CalendarBody>{generateCalendar()}</CalendarBody>
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Prev = styled.button``;
const Next = styled.button``;

const Empty = styled.div`
  padding: 5px;
`;

const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const CalendarDay = styled.div<{ isSelected?: boolean }>`
  cursor: pointer;
  padding: 5px;
  text-align: center;
  font-weight: 700;
  background-color: ${(props) =>
    props.isSelected ? 'lightblue' : 'transparent'};
`;
export default Calendar;
