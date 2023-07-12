import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import DailyExpenseModal from '@/pages/Home/DailyExpenseModal';
import '@/pages/Home/Calendar.scss';
import '@/pages/Home/ExpenseModal.scss';
import { useEffect, useMemo, useState } from 'react';
import formatDate from '@/utils/formatDateAndTime';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import Calendar from 'react-calendar';
import getExpenses from '@/pages/Home/getExpenses';
import MySkeleton from '@/pages/Statistics/MySkeleton';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function Home() {
  const [value, onChange] = useState(new Date());
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>({});
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

  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);

  const dailyExpenses = useMemo(() => {
    if (monthlyExpenses && monthlyExpenses[day]) {
      return monthlyExpenses[day].map((expense) => ({
        ...expense,
        key: expense._id,
        time: formatDate(expense.date).time,
      }));
    }
    return [];
  }, [day, monthlyExpenses]);

    const expenseDay = Object.keys(monthlyExpenses)
    const totalAmount = dailyExpenses.map(item=>item.amount)
    const a = expenseDay.map(item=>monthlyExpenses[item])
    console.log(expenseDay)

  // const expensesInfo = () =>{
  //   const expenseDay = Object.keys(monthlyExpenses)
  //   const totalAmount = dailyExpenses.map(item=>item.amount)
  //   const a = expenseDay.map(item=>monthlyExpenses[item])
  //   if(expenseDay.find(item=>monthlyExpenses[item])){
  //     const sum = totalAmount.reduce((a,b)=>(a + b))
  //     return <>
  //     <span>총소비 : {sum}원</span>
  //     <span>소비횟수 : {dailyExpenses.length}회</span>
  //     </>
  //   }
  // }

  return (
    <>
    {loading
      ? <MySkeleton/>
      : <Calendar
      onChange={(value:Value)=>{onChange(value as Date)}}
      value={value}
      onClickDay={() => setDailyExpenseModalOpen(true)}
      // tileContent={expensesInfo}
      showNeighboringMonth={false}/>
    }

      <ExpenditureForm />

      <DailyExpenseModal
        month={month}
        day={day}
        dailyExpenses={dailyExpenses}
        dailyExpenseModalOpen={dailyExpenseModalOpen}
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
      />
    </>
  );
}
