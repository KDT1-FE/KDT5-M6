import { styled } from 'styled-components';
import { getCalendar } from '../../lib/API';
import { useEffect, useState } from 'react';
interface IStatsProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
function Stats({ date }: IStatsProps) {
  const [total, setTotal] = useState();
  const [lastTotal, setLastTotal] = useState();

  const monthSpending = async (year: number, month: number, userId: string) => {
    const res = await getCalendar(year, month, userId);
    const newRes = Object.values(res);
    let newArray = [];
    newRes.forEach((item) => {
      item.forEach((i) => {
        newArray.push(i.amount);
      });
    });
    const Income = newArray.filter((item) => item >= 0);
    const Spending = newArray.filter((item) => item < 0);

    const totalIncome = Income.reduce((acc, cur) => acc + cur, 0);
    const totalSpending = Spending.reduce((acc, cur) => acc + cur, 0);

    const MonthTotal = totalIncome + totalSpending;
    return MonthTotal;
  };

  const currentMonthTotal = async (
    year: number,
    month: number,
    userId: string
  ) => {
    const MonthTotal = await monthSpending(year, month, userId);
    setTotal(MonthTotal);
  };
  const lastMonthTotal = async (
    year: number,
    month: number,
    userId: string
  ) => {
    const MonthTotal = await monthSpending(year, month, userId);
    setLastTotal(MonthTotal);
  };

  const LastMonth = new Date(date).getMonth();
  const Month = new Date(date).getMonth() + 1;
  const FullYear = new Date(date).getFullYear();

  const Numformat = new Intl.NumberFormat('ko-KR');

  useEffect(() => {
    lastMonthTotal(FullYear, LastMonth, 'user123');
    currentMonthTotal(FullYear, Month, 'user123');
  }, [Month, LastMonth]);

  return (
    <Container>
      <Title>{Month}월 누적 지출금액은 </Title>
      <Title>
        <Amount>{Numformat.format(total)}</Amount>원 입니다.
      </Title>
      <LastAmount>
        지난 달 대비 {Numformat.format(total - lastTotal)}원 지출
      </LastAmount>
    </Container>
  );
}

export default Stats;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  height: 200px;
  width: 730px;
  margin-left: 30px;
`;
const Title = styled.h2`
  font-size: 40px;
`;

const Amount = styled.span`
  color: #ff6969;
`;

const LastAmount = styled.p`
  color: #6a6e83;
  margin: 10px 5px 0;
  font-size: 15px;
`;
