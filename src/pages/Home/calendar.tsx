import Calendar from "react-calendar"
import { useState } from 'react'
import '@/pages/Home/Calendar.scss';
import getExpenses from "@/pages/Home/getExpenses";
import moment from "moment";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  const day = moment(value).format('D')

  const changeData = (value: any) => {
    console.log(day)
    onChange(value)
    getExpenses(value).then(res=>{
      res
    },error=>{
      console.log(error)
    })
  }

  return <>
    <Calendar
      onChange={changeData}
      value={value}/>
  </>
}