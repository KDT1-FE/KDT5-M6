import Calendar from "react-calendar"
import { useState, useEffect, useRef } from 'react'
import '@/pages/Home/Calendar.scss';
import '@/pages/Home/ExpenseModal.scss';
import getExpenses from "@/pages/Home/getExpenses";
import moment from "moment";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());
  const [expenseList, setExpenseList] = useState({})
  const [dayInfo, setDayInfo] = useState([])
  const [dateChanged, setDateChanged] = useState<boolean>(false)
  const modalRef = useRef<HTMLInputElement | null>(null)

  const day  = moment(value).format('D')

  useEffect(()=>{
    getExpenses(value).then(res=>{
      setExpenseList(res)
      if(res[day] === undefined){
        setDayInfo([])
      }else{
        setDayInfo(res[day])
      }
      console.log(dayInfo)
    })
  },[value])

  useEffect(() => {
    function handleOutside(e: Event) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if (dateChanged) {
          setDateChanged(false)
        }
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [modalRef, dateChanged])

  const changeData = (value: Value) => {
    onChange(value)
    setDateChanged(true)
  }

  return <>
      {dateChanged && (dayInfo !== undefined)
      ? <div className='modal-background'>
          <div
            className='modal'
            ref={modalRef}>
              {/* {dayInfo.map((item,index)=>(
                <div>
                  {item[index].amount}원
                </div>
              ))} */}
          </div>
        </div>
      : null}
    <Calendar
      onChange={changeData}
      value={value}/>
  </>
}