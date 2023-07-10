import { styled } from 'styled-components';

interface ICalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
}

function Calendar({ selectedDate, setSelectedDate, date }: ICalendarProps) {
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
          isSelected={
            new Date(selectedDate).toLocaleDateString() ===
            new Date(year, month, day).toLocaleDateString()
          }
          isSunday={new Date(year, month, day).getDay() === 0}
          isSaturday={new Date(year, month, day).getDay() === 6}
        >
          <div>{day}</div>
        </CalendarDay>
      );
    }

    return calendar;
  };

  return (
    <CalendarContainer>
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
  font-family: 'poppins';
  height: 400px;
  width: 400px;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  margin: 30px auto 0;
`;

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

const CalendarDay = styled.div<{
  isSelected?: boolean;
  isSunday?: boolean;
  isSaturday?: boolean;
}>`
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ isSaturday, isSunday, theme }) =>
    isSaturday
      ? theme.colors.blue.main
      : isSunday
      ? theme.colors.red
      : theme.colors.black};

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: ${({ isSelected }) =>
      isSelected ? '#5A81FA' : 'transparent'};
    color: ${({ isSelected, theme }) => isSelected && theme.colors.white};
  }
`;
export default Calendar;
