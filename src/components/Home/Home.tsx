import { useEffect, useState } from 'react';
import UserId from '@/components/Home/UserId';
import Calendar from '@/components/Home/Calendar';
import ExpensesList from '@/components/Home/ExpensesList';
import { calendarData, expenseSearch } from '@/lib/api/Api';

export interface SelectedDateProps {
  year: number;
  month: number;
  currentDay: number;
}

interface SelectedDailyProps {
  amount: number;
  category: string;
  date: string;
  userId: string;
  _id: string;
}

function Home() {
  const [tag, setTag] = useState(''); // 카테고리 소비 태그
  const [dailyList, setDailyList] = useState<SelectedDailyProps[]>([]);
  const [monthlyList, setMonthlyList] = useState([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDateProps>();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const onDayClick = (year: number, month: number, currentDay: number) => {
    setSelectedDate({ year, month, currentDay });
  };

  const onItemUpdated = async () => {
    const res = await calendarData(currentYear, currentMonth);
    setMonthlyList(res);
    if (selectedDate) {
      setDailyList(res[selectedDate.currentDay]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await calendarData(currentYear, currentMonth);
      setMonthlyList(res);
    };

    fetchData();
  }, [currentYear, currentMonth, tag]);

  useEffect(() => {
    if (selectedDate) {
      setDailyList(monthlyList[selectedDate.currentDay]);
    }
  }, [selectedDate, monthlyList]);

  useEffect(() => {
    const fetchCategoryList = async () => {
      if (tag) {
        const res = await expenseSearch(tag);
        setDailyList(res);
      }
    };
    fetchCategoryList();
  }, [tag]);

  return (
    <>
      <UserId />
      <Calendar
        setTag={setTag}
        onDayClick={onDayClick}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
        monthlyList={monthlyList}
        onItemUpdated={onItemUpdated}
      />

      <ExpensesList
        dailyList={dailyList}
        tag={tag}
        onItemUpdated={onItemUpdated}
      />
    </>
  );
}

export default Home;
