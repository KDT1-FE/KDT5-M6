import ExpenditureForm from '@/pages/Home/ExpenditureForm';
import { FloatButton, theme } from 'antd';
import DailyExpenseModal from '@/pages/Home/DailyExpenseModal';
import '@/pages/Home/Calendar.scss';
import { useEffect, useMemo, useState } from 'react';
import formatDateAndTime from '@/utils/formatDateAndTime';
import moment from 'moment';
import { MontlyExpensesType } from '@/types/expenses';
import Calendar from 'react-calendar';
import { PlusOutlined } from '@ant-design/icons';
import getExpenses from '@/pages/Home/getExpenses';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Search from './Search';
import loadingImg from '@/assets/favicon.png';

export default function Home() {
  const [togglefetch, setToggleFetch] = useState(false);
  const [value, setValue] = useState(new Date()); // 선택한 날짜

  // value 값이 변할 때마다 년,월,일 값 갱신
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  // 월별 소비 데이터가 저장된 state
  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>(
    {},
  );
  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);

  // loading ui
  const [loading, setLoading] = useState(false);

  // 월 소비 데이터 통신
  useEffect(() => {
    //loading 값 false면 스켈레톤 적용
    const getData = async () => {
      setLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });
      try {
        const response = await getExpenses(year, month);
        // api로 받아온 데이터 monthlyExpenses에 저장
        setMonthlyExpenses(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [month, year, togglefetch]);

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

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const ExpensesColor = (a: number) => {
    if (a <= 50000) {
      return '#C0D98A';
    } else if (a > 50000 && a <= 100000) {
      return '#A6C4F0';
    } else if (a > 100000 && a <= 150000) {
      return '#FFE68D';
    } else if (a > 150000) {
      return '#F8AB9A';
    }
  };

  //소비한 날들만 배열데이터로 저장
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
    if (
      expenseDay.find(
        (day) => day === moment(date).utcOffset(9).format('YYYY-MM-DD'),
      )
    ) {
      const eachDay = moment(date).format('D');
      const dailyExpense = monthlyExpenses[eachDay];
      const dailyExpensesSum = dailyExpense
        .map((item) => item.amount)
        .reduce((a, b) => a + b, 0);
      //총소비량

      // 각 일자별로 해당일의 소비데이터를 아래 형식으로 출력
      const dailyExpensesSumFormatted = dailyExpensesSum.toLocaleString(); // 표기법 변경
      contents.push(
        <div key={date.toISOString()} className="expense">
          <div style={{ background: `${ExpensesColor(dailyExpensesSum)}` }}>
            {dailyExpensesSumFormatted}원
          </div>
          <div
            style={{
              background: `${colorPrimary}`,
              color: `white`,
            }}
          >
            {dailyExpense.length}
          </div>
        </div>,
      );
    }
    return <>{contents}</>;
  };

  return (
    <>
      <Search
        dailyExpenses={dailyExpenses}
        togglefetch={togglefetch}
        setValue={setValue}
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
      />
      {loading ? (
        <div
          className="loading-animation"
          style={{ display: 'flex', alignItems: 'center', zIndex: 2000 }}
        >
          <img src={loadingImg} alt="loading" width={50} />
          <span
            style={{
              paddingLeft: 20,
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            loading...
          </span>
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
          locale="en"
          minDetail="month"
          prev2Label={null}
          next2Label={null}
          onActiveStartDateChange={({ activeStartDate }) => {
            setValue(activeStartDate!);
          }}
        />
      )}
      <DailyExpenseModal
        year={year}
        month={month}
        day={day}
        dailyExpenses={dailyExpenses}
        dailyExpenseModalOpen={dailyExpenseModalOpen}
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
        setToggleFetch={setToggleFetch}
      />
      <ExpenditureForm
        open={addExpenseModalOpen}
        setToggleFetch={setToggleFetch}
        setOpen={setAddExpenseModalOpen}
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
