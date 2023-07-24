import styled from "styled-components";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getCalendarConsume } from "../../lib/api/consumeAPI";
import { totalAmount } from "./totalAmount";
import { useRecoilState, useRecoilValue } from "recoil";
import { todayAtom } from "../../state/today";
import {
  openModalAtom,
  openDeleteModalAtom,
  openEditModalAtom,
} from "../../state/modalClose";

export function CalendarView() {
  const [monthlyCharge, setMonthlyCharge] = useState([]);
  const [today, setToday] = useRecoilState(todayAtom);
  const addValue = useRecoilValue(openModalAtom);
  const editValue = useRecoilValue(openEditModalAtom);
  const deleteValue = useRecoilValue(openDeleteModalAtom);
  const navMonth = today.getMonth();
  const navYear = today.getFullYear();

  //api호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchRes = await getCalendarConsume({
          year: navYear,
          month: navMonth + 1,
          userId: "team1",
        });
        const result = fetchRes.data;
        setMonthlyCharge(result);
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => fetchData(), 5);
  }, [navYear, navMonth, addValue, editValue, deleteValue]);

  return (
    <CalendarContainer>
      <Calendar
        value={today}
        calendarType={"US"}
        onChange={(value: any) => setToday(value)}
        onActiveStartDateChange={({ activeStartDate }: any) =>
          setToday(activeStartDate)
        }
        showNeighboringMonth={false}
        tileContent={({ date, view }: { date: Date; view: string }) =>
          view === "month" &&
          Object.keys(monthlyCharge).map((a) =>
            a === date.getDate().toString() ? (
              <div key={a}>
                {totalAmount(monthlyCharge[Number(a)])[0] !== 0 ? (
                  <p className="amount-text">
                    {totalAmount(monthlyCharge[Number(a)])[0].toLocaleString()}
                  </p>
                ) : null}
                {totalAmount(monthlyCharge[Number(a)])[1] !== 0 ? (
                  <p className="amount-text posi">
                    {"+" +
                      totalAmount(monthlyCharge[Number(a)])[1].toLocaleString()}
                  </p>
                ) : null}
              </div>
            ) : null,
          )
        }
      />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  .react-calendar {
    padding: 20px 20px 40px 20px;
    border: 0;
    width: 100%;
    background-color: ${(props) => props.theme.containerBoxColor};
    color: #222;
    line-height: 1.4em;
  }
  .react-calendar__navigation button {
    font-family: "Pretendard-Regular", sans-serif;
    color: #a55eea;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .amount-text {
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    opacity: 0.5;
  }
  .react-calendar__month-view__weekdays__weekday {
    color: #666;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__tile {
    font-family: "Pretendard-Regular", sans-serif;

    display: flex;
    flex-direction: column;
    align-items: center;
    height: 4.5rem;
    gap: 6px;
    .posi {
      color: #a55eea;
      opacity: 1;
    }
  }
  .react-calendar__month-view__days__day--weekend {
    color: #a55eea;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: ${(props) => props.theme.hoverColor};
    color: #a55eea;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #a55eea;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #a55eea;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #a55eea;
    border-radius: 6px;
    font-weight: bold;
    color: white;
    .amount-text {
      color: white;
    }
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #a55eea;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
`;
