import { Calendar } from 'antd';
import { styled } from 'styled-components';

function CalendarComponent() {
  return (
    <CalendarContainer>
      <StyledCalendar />
    </CalendarContainer>
  );
}
const CalendarContainer = styled.div``;
const StyledCalendar = styled(Calendar)``;

export default CalendarComponent;
