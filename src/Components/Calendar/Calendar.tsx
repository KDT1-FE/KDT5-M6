import { useEffect, useState, useCallback, useRef } from "react";
import generateCalendar from "@/Common/calendar";
import "./Calendar.scss";
// import axios from "axios";
// import dayjs from "dayjs";
import { useQuery, } from "@tanstack/react-query";
import { getSummary } from "@/Api/api.ts";
import dayjs from "dayjs";

export default function Calendar(props: Props) {
  const {
    month,
    year,
    setMonth,
    setYear,
    today,
    setToday,
    category,
    backgroundColor
  } = props;
  const [totalDates, setTotalDates] = useState<number[]>([]);
  const makeCalendar = useCallback(
    (year: number, month: number) => {
      setTotalDates(generateCalendar(year, month));
    },
    [month, year]
  );
  useEffect(() => {
    if (!month) {
      setYear(year - 1);
      setMonth(12);
    } else if (month > 12) {
      setYear(year + 1);
      setMonth(1);
    }
    makeCalendar(year, month);
    // (async () => {
    //   await tempApi();
    // })();
  }, [month, year]);

  const dayList = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  //const today = new Date().getDate();
  const sth = useRef<Map<string, number>>();

  const params: SummaryType = {
    period: "daily",
    userId: "team6",
    category: category
  };
  const { isLoading, error, data: summaryData }
    = useQuery(["summaryData", params], () => {
    return getSummary(params).then((res) => {
      const data: ResponseCalendar[] = res;
      const arr: CalendarMap[] = data.map((v) => [v._id, v.totalAmount]);
      sth.current = new Map<string, number>(arr);
      return sth.current;
    });
  },{staleTime: 1000*60});

  if (isLoading) {
    return "Loading...";
  } else if (error instanceof Error) {
    return `An error has occurred: ${error.message}`;
  }

  return (
    <div className="calendar">
      <div className="days">
        {dayList.map((v) => (
          <div className="day" key={v}>
            {v}
          </div>
        ))}
      </div>
      <div className="dates">
        {totalDates &&
          totalDates.map((date, i) => {
            const last = totalDates.indexOf(1, 8);
            return (
              <div
                className={`date ${date > i ? "gray" : ""} ${
                  last <= i && last != -1 ? "gray" : ""
                } ${date === today ? "today" : ""}`}
                style={{
                  backgroundColor: date === today ? backgroundColor : ""
                }}
                onClick={() => {
                  setToday(date);
                }}
                key={i}
              >
                <div>{date}</div>
                {!(date > i || last <= i) && (
                  <span>
                    {summaryData?.get(dayjs(`${year}-${month}-${date}`).format("YYYY-MM-DD"))?.toLocaleString()}
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
