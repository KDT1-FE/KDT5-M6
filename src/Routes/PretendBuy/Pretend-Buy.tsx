import { useState } from "react";
import RemoteDate from "@/Components/Calendar/RemoteDate.tsx";
import Calendar from "@/Components/Calendar/Calendar.tsx";
import ContentPost from "@/Components/Common/Content-post.tsx";
export default function PretendBuy() {
  const [whatYear, setWhatYear] = useState(new Date().getFullYear());
  const [whatMonth, setWhatMonth] = useState(new Date().getMonth() + 1);
  const [today, setToday] = useState(new Date().getDate());

  let todayDate: string = `${whatYear}-${String(whatMonth).padStart(2, "0")}-${String(today).padStart(2, "0")}`;
  return (
    <>
      <RemoteDate
        month={whatMonth}
        year={whatYear}
        setMonth={setWhatMonth}
        setYear={setWhatYear}
        backgroundColor={"var(--primary2)"}
      />
      <Calendar
        month={whatMonth}
        year={whatYear}
        today={today}
        setToday={setToday}
        setMonth={setWhatMonth}
        setYear={setWhatYear}
        category={'삿다치고'}
        backgroundColor={"var(--primary1)"}
      />
      <ContentPost todayDate={todayDate} categoryName={"삿다치고"}/>
    </>
  )
}
