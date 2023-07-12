import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import { FloatButton } from 'antd';
import DailyExpenseModal from '@/pages/Home/DailyExpenseModal';
import '@/pages/Home/Calendar.scss';
import { useEffect, useMemo, useState } from 'react';
import formatDate from '@/utils/formatDateAndTime';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import Calendar from 'react-calendar';
import { PlusOutlined } from '@ant-design/icons';
import Search from '@/pages/Home/Search';
import getExpenses from '@/pages/Home/getExpenses';
import MySkeleton from '@/components/MySkeleton';
import { Value } from 'react-calendar/dist/cjs/shared/types';

export default function Home() {
  const [edit] = useState(true);
  const [list, setList] = useState(false);
  const [selected] = useState('');

  const [value, setValue] = useState(new Date());
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);
  const [addExpenseModalOpen, setaddExpenseModalOpen] = useState(false);

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
  }, [month, year, list]);

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

  const expensesInfo = () => {
    if (dailyExpenses)
      return (
        <>
          <span>총소비 : {}</span>
          <span>소비횟수 : </span>
        </>
      );
  };

  return (
    <>
      <Search />
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
          tileContent={expensesInfo}
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
        setOpen={setaddExpenseModalOpen}
        edit={edit}
        list={list}
        setList={setList}
        selected={selected}
      />
      <FloatButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setaddExpenseModalOpen(true);
        }}
      />
    </>
  );
}
