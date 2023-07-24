import styled from "styled-components";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { CalendarView } from "./CalendarView";
import { WeeklyView } from "./WeeklyView";

function CalendarSection() {
  const [toggleBtn, setToggleBtn] = useState(true);

  return (
    <Section>
      <Header>
        <h2>지출 내역</h2>
        <div className="buttonContainer">
          <button
            onClick={() => setToggleBtn(false)}
            className={toggleBtn === false ? "active" : ""}
          >
            주간별
          </button>
          <button
            onClick={() => setToggleBtn(true)}
            className={toggleBtn === true ? "active" : ""}
          >
            월별
          </button>
        </div>
      </Header>
      <Container>
        {toggleBtn === true ? <CalendarView /> : <WeeklyView />}
      </Container>
    </Section>
  );
}

const Section = styled.section`
  width: 30rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3rem;
  width: 100%;
  padding: 24px 28px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  h2 {
    font-weight: 700;
  }
  .buttonContainer {
    button {
      margin-left: 6px;
      padding: 4px 8px;
      background-color: ${(props) => props.theme.containerBoxColor};
      border: 1px solid ${(props) => props.theme.borderColor};
      border-radius: 8px;
      transition: 0.2s;
    }
    .active,
    button:hover {
      background-color: ${(props) => props.theme.buttonColor};
      border: 1px solid #a55eea;
      color: white;
    }
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
`;
export default CalendarSection;
