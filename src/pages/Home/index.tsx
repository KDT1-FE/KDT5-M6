import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import { FloatButton } from 'antd';
import DailyExpenseModal from '@/pages/Home/DailyExpenseModal';
import '@/pages/Home/Calendar.scss';
import { useEffect, useMemo, useState } from 'react';
import formatDateAndTime from '@/utils/formatDateAndTime';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import Calendar from 'react-calendar';
import { PlusOutlined } from '@ant-design/icons';
import getExpenses from '@/pages/Home/getExpenses';
import MySkeleton from '@/components/MySkeleton';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function Home() {
  const [list, setList] = useState(false);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [value, setValue] = useState(new Date()); // 선택한 날짜

  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>(
    {},
  );
  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);

  // loading ui
  const [loading, setLoading] = useState(false);

  // 월 소비 데이터 통신
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const response = await getExpenses(year, month);
        setMonthlyExpenses(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [month, year, list]);

  const dailyExpenses = useMemo(() => {
    if (monthlyExpenses && monthlyExpenses[day]) {
      return monthlyExpenses[day].map((expense) => ({
        ...expense,
        key: expense._id,
        time: formatDateAndTime(expense.date).time,
      }));
    }
    return [];
  }, [day, monthlyExpenses]);

  const expenseDay = useMemo(
    () =>
      Object.keys(monthlyExpenses).map(
        (day) => `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      ),
    [month, monthlyExpenses, year],
  );

  // 총소비액
  const addContents = ({ date }: { date: Date }) => {
    const contents = [];
    //소비가 있는 날짜에만 값을 기입
    if (expenseDay.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      const eachDay = moment(date).format('D');
      const dailyExpense = monthlyExpenses[eachDay];
      const dailyExpensesSum = dailyExpense
        .map((item) => item.amount)
        .reduce((a, b) => a + b, 0);
      //총소비량

      contents.push(
        <div key={date.toISOString()}>
          <span>총소비 : {dailyExpensesSum}원</span>
          <br />
          <span>소비횟수 : {dailyExpense.length}회</span>
        </div>,
      );
    }
    return <>{contents}</>;
  };

  return (
    <>
      {loading ? (
        <div>
          <MySkeleton />
        </div>
      ) : (
        <Calendar
          onChange={(value: Value) => {
            setValue(value as Date);
          }}
          value={value}
          onClickDay={() => setDailyExpenseModalOpen(true)}
          tileContent={addContents}
          formatDay={(_locale, date) => moment(date).format('D')}
          showNeighboringMonth={false}
          minDetail="month"
          prev2Label={null}
          next2Label={null}
          onActiveStartDateChange={({ activeStartDate }) => {
            setValue(activeStartDate!);
          }}
        />
      )}

      <DailyExpenseModal
        month={month}
        day={day}
        dailyExpenses={dailyExpenses}
        dailyExpenseModalOpen={dailyExpenseModalOpen}
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
        list={list}
        setList={setList}
      />
      <ExpenditureForm
        open={addExpenseModalOpen}
        setOpen={setAddExpenseModalOpen}
        list={list}
        setList={setList}
        setToggleAdd={setToggleAdd}
      />
      <FloatButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setAddExpenseModalOpen(true);
        }}
      />
    </>
  );
}
