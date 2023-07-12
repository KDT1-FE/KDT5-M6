import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import DailyExpenseModal from './DailyExpenseModal';
import './Calendar.scss';
import './ExpenseModal.scss';
import { useEffect, useMemo, useState } from 'react';
import formatDate from '@/utils/formatDateAndTime';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import Calendar from 'react-calendar';
import getExpenses from './getExpenses';

export default function Home() {
  const [value, onChange] = useState(new Date());
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>();
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

  return (
    <>
      <Calendar
        onChange={onChange}
        value={value}
        onClickDay={() => setDailyExpenseModalOpen(true)}
      />
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
