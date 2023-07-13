import { styled, css } from 'styled-components';
import { IContentExtend, getCalendar } from '../../lib/API';
import { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

interface IStatsProps {
  date: Date;
}
interface IColorProps {
  $IncomeColor?: boolean;
  $SpendingColor?: boolean;
}

function Stats({ date }: IStatsProps) {
  const [income, setIncome] = useState<number>();
  const [spending, setSpending] = useState<number>();
  const [thisMonth, setThisMonth] = useState<number | undefined>();
  const [lastMonth, setLastMonth] = useState<number | undefined>();
  const monthAmount = async (year: number, month: number, userId: string) => {
    const res = await getCalendar(year, month, userId);
    const newRes: IContentExtend[][] = Object.values(res);
    let newArray: number[] = [];
    newRes.forEach((item) => {
      if (item) {
        item.forEach((i) => {
          newArray.push(i.amount);
        });
      }
    });
    const Income = newArray.filter((item) => item >= 0);
    const Spending = newArray.filter((item) => item < 0);

    const TotalIncome = Income.reduce((acc, cur) => acc + cur, 0);
    const TotalSpending = Spending.reduce((acc, cur) => acc + cur, 0);
    console.log('총수입', TotalIncome, '총지출', TotalSpending);
    if (month === Month) {
      setIncome(TotalIncome);
      setSpending(TotalSpending);
    }
    const AmountTotal = TotalIncome + TotalSpending;
    return AmountTotal;
  };

  const currentMonthAmount = async (
    year: number,
    month: number,
    userId: string
  ) => {
    const total = await monthAmount(year, month, userId);
    console.log('이번달합계', total);
    setThisMonth(total);
  };

  const LastMonthAmount = async (
    year: number,
    month: number,
    userId: string
  ) => {
    const total = await monthAmount(year, month, userId);
    console.log('저번달합계', total);
    setLastMonth(total);
  };

  const LastMonth = new Date(date).getMonth();
  const Month = new Date(date).getMonth() + 1;
  const FullYear = new Date(date).getFullYear();

  const incomes = income?.toLocaleString();
  const spendings = spending?.toLocaleString();
  const Total = new Intl.NumberFormat('ko-KR');

  useEffect(() => {
    currentMonthAmount(FullYear, Month, 'user123');
    LastMonthAmount(FullYear, LastMonth, 'user123');
  });

  return (
    <Container>
      <Wrapper>
        <Title $IncomeColor>{Month}월 수입</Title>
        <Money $IncomeColor>{incomes}</Money>
      </Wrapper>
      <Line />
      <Wrapper>
        <Title $SpendingColor>{Month}월 지출</Title>
        <Money $SpendingColor>{spendings}</Money>
      </Wrapper>
      <Line />
      <Wrapper>
        <Title>전 월 대비</Title>
        <Money>{Total.format((thisMonth ?? 0) + (lastMonth ?? 0))}</Money>
      </Wrapper>
    </Container>
  );
}

export default Stats;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 35px;
  height: 150px;
  width: 96%;
  margin: 20px 20px 10px;
  background-color: ${theme.colors.black.black100};
  border-radius: 40px;
  box-shadow: 5px 5px 20px;
`;

const Title = styled.h2<IColorProps>`
  font-size: 20px;

  ${({ $IncomeColor, $SpendingColor, theme }) => css`
    color: ${$IncomeColor
      ? theme.colors.blue.main
      : $SpendingColor
      ? theme.colors.red
      : theme.colors.white};
  `}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Money = styled.h2<IColorProps>`
  font-size: 30px;

  ${({ $IncomeColor, $SpendingColor, theme }) => css`
    color: ${$IncomeColor
      ? theme.colors.blue.main
      : $SpendingColor
      ? theme.colors.red
      : theme.colors.white};
  `}
`;

const Line = styled.div`
  border-left: 1px solid ${theme.colors.white};
  height: 63px;
`;
