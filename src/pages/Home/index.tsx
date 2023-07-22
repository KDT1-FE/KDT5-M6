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
import Search from '@/pages/Home/Search';
import loadingImg from '@/assets/favicon.png';

export default function Home() {
  // 소비를 등록, 수정, 삭제 할 때마다 getExpenses 통신이 발생하도록 하는 야매 방법
  const [togglefetch, setToggleFetch] = useState(false);

  // 달력에서 날짜를 선택했을 때 해당 날짜(value)를 state로 관리
  const [value, setValue] = useState(new Date());

  // value 값이 변할 때마다 년,월,일 값 갱신
  // 재랜더링 되는 경우(예, tooglefetch값이 변할 때) 해당 값들이 연산되는 것을 막기 위한 useMemo
  const day = useMemo(() => moment(value).format('D'), [value]);
  const month = useMemo(() => moment(value).format('M'), [value]);
  const year = useMemo(() => moment(value).format('YYYY'), [value]);

  // 달력에서 날짜를 클릭했을 때 일별 소비를 표시해주는 모달의 열림 닫힘 state
  const [dailyExpenseModalOpen, setDailyExpenseModalOpen] = useState(false);

  // 소비를 등록 모달의 열림 닫힘 state
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);

  // loading state
  const [loading, setLoading] = useState(false);

  // 월별 소비 데이터 state
  const [monthlyExpenses, setMonthlyExpenses] = useState<MontlyExpensesType>(
    {},
  );
  // 월 소비 데이터 통신
  useEffect(() => {
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
  console.log(monthlyExpenses);

  // 통신으로 가져온 월소비기록(monthlyExpenses)에서 현재 선택된 day값에 따라서 새로운 형식의 일별소비내역을 return하는 식
  // 얘도 랜더링이 될 때마다 계산해주는 것은 비효율적이므로 useMemo사용
  const dailyExpenses = useMemo(() => {
    if (monthlyExpenses && monthlyExpenses[day]) {
      return monthlyExpenses[day].map((expense) => ({
        // 기존 객체를 다 가져오고
        ...expense,

        // 필요한 속성을 삽입
        key: expense._id,
        time: formatDateAndTime(expense.date).time,
      }));
    }
    return [];
  }, [day, monthlyExpenses]);

  // antD 강조색을 가져옴
  const {
    token: { colorPrimary },
  } = theme.useToken();

  // 일 소비 총액에 따라서 색을 return함
  const ExpensesColor = (dailyExpensesSum: number) => {
    if (dailyExpensesSum <= 50000) {
      return '#C0D98A';
    } else if (dailyExpensesSum > 50000 && dailyExpensesSum <= 100000) {
      return '#A6C4F0';
    } else if (dailyExpensesSum > 100000 && dailyExpensesSum <= 150000) {
      return '#FFE68D';
    } else if (dailyExpensesSum > 150000) {
      return '#F8AB9A';
    }
  };

  // 소비한 날들만 ['2023-07-03', '2023-07-10', '2023-07-21', '2023-07-30'] 형식으로 return
  const expenseDay = useMemo(
    () =>
      Object.keys(monthlyExpenses).map(
        (day) => `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`,
      ),
    [month, monthlyExpenses, year],
  );

  // 달력에서 해당하는 날짜에 넣어줄 dom요소를 만들어주는 코드
  const addContents = ({ date }: { date: Date }) => {
    // 여기에서 date는 해당 월의 1일 부터 말일까지임, 해당 date를 돌면서 조건에 따라 dom을 생성함

    const contents = [];

    if (
      //소비가 있는 날짜에만 값을 기입
      expenseDay.find(
        // date를 '2023-07-03' 형식으로 만들어서 위에서 생성한 expenseDay와 비교함
        (day) => day === moment(date).format('YYYY-MM-DD'),
      )
    ) {
      // 해당 날짜가 있다면 그 날의 일 데이터 '3'을 통해 monthlyExpenses객체 값에서 dailtExpense를 구함
      const eachDay = moment(date).format('D');
      const dailyExpense = monthlyExpenses[eachDay];

      // 구한 dailyExpensesSum 배열에서 모든 요소의 소비액을 더함
      const dailyExpensesSum = dailyExpense
        .map((item) => item.amount)
        .reduce((a, b) => a + b, 0);
      //총소비량

      // 각 일자별로 해당일의 소비데이터를 아래 형식으로 출력
      contents.push(
        <div key={date.toISOString()} className="expense">
          <div
            style={{ backgroundColor: `${ExpensesColor(dailyExpensesSum)}` }}
          >
            {dailyExpensesSum.toLocaleString()}원
          </div>

          {/* 일별 소비 횟수 */}
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
          style={{
            zIndex: 2000,
            backgroundColor: 'white',
            width: '100vw',
            height: '100vh',
          }}
        >
          <div
            className="loading-animation"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
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
          // 월 이동 화살표를 눌렀을 때 다음 콜백함수를 실행
          onActiveStartDateChange={({ activeStartDate }) => {
            //activeStartDate는 이동한 월의 첫번째 날을 말함, 새로운 월에 해당한는 월소비 데이터를 통신하여 가져와야하므로
            setValue(activeStartDate!);
          }}
        />
      )}
      {/* 달력에서 날짜를 선택시 열리는 모달 */}
      <DailyExpenseModal
        year={year}
        month={month}
        day={day}
        dailyExpenses={dailyExpenses}
        dailyExpenseModalOpen={dailyExpenseModalOpen}
        setDailyExpenseModalOpen={setDailyExpenseModalOpen}
        setToggleFetch={setToggleFetch}
      />
      {/* +버튼을 눌렀을 때 열리는 모달 */}
      <ExpenditureForm
        open={addExpenseModalOpen}
        setOpen={setAddExpenseModalOpen}
        setToggleFetch={setToggleFetch}
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
