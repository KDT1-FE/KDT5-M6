import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import DailyExpenseModal from './DailyExpenseModal';
import { Button } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { MonthlyExpenseType } from '@/types/expense';
import formatDate from '@/utils/formatDateAndTime';

export default function Home() {
  const userId = useMemo(() => import.meta.env.VITE_USER_ID, []);
  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 날짜
  const [year, setYear] = useState('2023');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenseType>();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      try {
        const response = await fetch(
          `http://52.78.195.183:3003/api/expenses/calendar?year=${year}&month=${month}&userId=${userId}`,
        );
        if (!response.ok) {
          console.log('서버에서 응답이 왔는데 원하는 값이 오지 않음');
          return;
        }
        const data = await response.json();
        setMonthlyExpenses(data);
      } catch (error) {
        console.error('Error: 서버에서 응답이 안옴 ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [day, month, userId, year]);

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

  const handleClickDay = () => {
    setDailyExpenseModalOpen(true);
    setMonth('7');
    setDay('11');
  };

  return (
    <>
      <ExpenditureForm />
      <Button onClick={handleClickDay}>
        {/* 달력 각 칸마다 onClick event */}
        7월11일
      </Button>
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
