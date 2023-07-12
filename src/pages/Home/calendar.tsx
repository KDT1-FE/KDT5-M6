import Calendar from 'react-calendar';
import { useState, useEffect, useRef, useMemo } from 'react';
import '@/pages/Home/Calendar.scss';
import '@/pages/Home/ExpenseModal.scss';
import getExpenses from '@/pages/Home/getExpenses';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function MyCalendar() {
  // state
  const [value, onChange] = useState(new Date());
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>();
  const [dayInfo, setDayInfo] = useState([]);
  const [dateChanged, setDateChanged] = useState<boolean>(false);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await getExpenses(year, month); // 분기가 나눠짐
        setMonthlyExpenses(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [month, year]);

  // 모달

  return (
    <>
      {dateChanged && dayInfo !== undefined ? (
        <div className="modal-background">
          <div className="modal" ref={modalRef}>
            {/* {dayInfo.map((item,index)=>(
                <div>
                  {item[index].amount}원
                </div>
              ))} */}
          </div>
        </div>
      ) : null}
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
