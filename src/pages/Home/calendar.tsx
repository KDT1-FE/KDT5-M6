import Calendar from "react-calendar"
import { useState, useEffect } from 'react'
import '@/pages/Home/Calendar.scss';
import getExpenses from "@/pages/Home/getExpenses";
import moment from "moment";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [expenseList, setExpenseList] = useState({})

  const day = moment(value).format('D')

  useEffect(()=>{
    getExpenses(value).then(res=>{
      setExpenseList(res)
    })
  },[value])


  const changeData = (value: any) => {
    onChange(value)
  }

  return <>
    <Calendar
      onChange={changeData}
      value={value}/>
  </>
}