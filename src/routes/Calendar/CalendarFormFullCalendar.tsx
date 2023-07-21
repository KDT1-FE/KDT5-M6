import { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { getCalendar } from "@/api";
import { useTimeStore } from "@/store/useTimeStore";
import { searchExpenses } from "@/api/index";
import { useExpensesStore } from "@/store/useExpensesStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

interface EventObject {
  title: string;
  date: string;
}

const CalendarFormFullCalendar = () => {
  const [events, setEvents] = useState<EventObject[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const calendarRef = useRef<FullCalendar>(null);
  const initialRender = useRef<boolean>(true);

  const userId = useUserStore((state) => state.userId);
  const setCurrentYear = useTimeStore((state) => state.setCurrentYear);
  const setCurrentMonth = useTimeStore((state) => state.setCurrentMonth);
  const setTotalLists = useExpensesStore((state) => state.setTotalLists);
  const setCurrentDay = useTimeStore((state) => state.setCurrentDay);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      searchExpenses("", userId).then((res) => {
        setTotalLists(res);
      });
      setCurrentYear(String(new Date().getFullYear()));
      setCurrentMonth(String(new Date().getMonth() + 1));
    }
  }, []);

  const handleDateClick = (arg: any) => {
    setCurrentYear(arg.dateStr.split("-")[0]);
    setCurrentMonth(arg.dateStr.split("-")[1]);
    setCurrentDay(arg.dateStr.split("-")[2]);
    navigate("/main/daily");
  };

  const handleDayCellDidMount = (arg: any) => {
    arg.el.addEventListener("click", () => {
      const dateString = `${arg.date.getFullYear()}-${arg.date.getMonth() + 1}-${arg.date.getDate()}`;
      handleDateClick({ dateStr: dateString });
    });
  };
  const handleDatesSet = () => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const calendarApi = calendarRef.current!.getApi();
      const newDate = calendarApi.getDate();
      const newYear = newDate.getFullYear();
      const newMonth = newDate.getMonth() + 1;
      if (newYear !== year || newMonth !== month) {
        setYear(newYear);
        setMonth(newMonth);
        setCurrentYear(String(newYear));
        setCurrentMonth(String(newMonth));
      }
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const res = await getCalendar(year, month, userId);
          const eventsData = Object.entries(res).reduce((acc: EventObject[], [day, dayData]: [string, unknown]) => {
            const typedDayData = dayData as Record<string, unknown>[];
            const totalIncome = typedDayData.reduce(
              (total: number, curr: any) => (curr.amount > 0 ? total + curr.amount : total),
              0
            );
            const totalExpense = typedDayData.reduce(
              (total: number, curr: any) => (curr.amount < 0 ? total - curr.amount : total),
              0
            );
            const total: number = totalIncome - totalExpense;

            return [
              ...acc,
              {
                title: `${totalIncome ? totalIncome : "none"},${totalExpense ? totalExpense : "none"},${
                  totalIncome && totalExpense ? total : "none"
                }`,
                date: `${year}-${month.toString().padStart(2, "0")}-${day.padStart(2, "0")}`
              }
            ];
          }, []);
          setEvents(eventsData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [year, month]);

  const renderEventContent = (eventInfo: any) => {
    let [income, expense, total] = eventInfo.event.title.split(",");
    return (
      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontSize: "0.4em",
            fontWeight: 900,
            color: "#34BE3A",
            visibility: income !== "none" ? "visible" : "hidden",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "100px" // Change the value as per the desired width
          }}
        >
          {Number(income).toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "0.4em",
            fontWeight: 900,
            color: "#ff7473",
            visibility: expense !== "none" ? "visible" : "hidden",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "100px" // Change the value as per the desired width
          }}
        >
          {Number(expense).toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "0.4em",
            fontWeight: 900,
            color: "#333333",
            visibility: total !== "none" ? "visible" : "hidden",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "100px" // Change the value as per the desired width
          }}
        >
          {Number(total).toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <CalendarContainer>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        dayCellDidMount={handleDayCellDidMount}
        datesSet={handleDatesSet}
        eventContent={renderEventContent}
        locale="ko"
        height="auto"
        dayCellContent={renderDayCellContent}
        dayMaxEventRows={true}
        eventDisplay="block"
        buttonText={{
          today: "오늘"
        }}
        buttonIcons={{
          prevYear: "chevron-double-left",
          nextYear: "chevron-double-right"
        }}
        customButtons={{
          moveYearBack: {
            icon: "chevrons-left",
            click: function () {
              let calendarApi = calendarRef.current!.getApi();
              calendarApi.prevYear();
            }
          },
          moveYearNext: {
            icon: "chevrons-right",
            click: function () {
              let calendarApi = calendarRef.current!.getApi();
              calendarApi.nextYear();
            }
          }
        }}
        headerToolbar={{
          left: "title",
          center: "moveYearBack,prev,next,moveYearNext",
          right: "today"
        }}
      />
    </CalendarContainer>
  );
};

function renderDayCellContent(dayRenderInfo: any) {
  return <>{dayRenderInfo.dayNumberText.replace("일", "")}</>;
}

export default CalendarFormFullCalendar;

const CalendarContainer = styled.div`
  margin: 0 10px 10px 10px;
  position: absolute;
  top: 180px;
  display: flex;
  flex-direction: column;
  height: 550px;
  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0.5em;
  }
  .fc-button {
    padding: 2px 4px;
    margin: 2px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  .fc-button .fc-icon {
    color: #d9d9d9;
  }
  .fc-button:not(:disabled) {
    color: white;
  }
  .fc-button:focus {
    outline: none;
    border: none;
    box-shadow: none;
  }
  .fc-button.fc-today-button {
    color: gray;
  }
  .fc-daygrid-day {
    height: 80px;
    background-color: white;
  }
  .fc-daygrid-day.fc-event {
    background: none;
    border: none;
  }
  .fc-event {
    background-color: transparent;
    border: none;
  }
  .fc-daygrid-day-events {
    margin-bottom: 0 !important;
  }
`;
