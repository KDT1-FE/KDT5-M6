import { styled, css } from 'styled-components';
import { IContentExtend, getCalendar } from '../../lib/API';
import { useCallback, useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

interface IStatsProps {
  date: Date;
  change: boolean;
}
interface IColorProps {
  $IncomeColor?: boolean;
  $SpendingColor?: boolean;
}

function Stats({ date, change }: IStatsProps) {
  const [income, setIncome] = useState<number>();
  const [lastIncome, setLastIncome] = useState<number>();
  const [spending, setSpending] = useState<number>();
  const [lastSpending, setLastSpending] = useState<number>();
  const [thisMonth, setThisMonth] = useState<number>();
  const [lastMonth, setLastMonth] = useState<number>();

  const LastMonth = new Date(date).getMonth();
  const Month = new Date(date).getMonth() + 1;
  const FullYear = new Date(date).getFullYear();

  const incomes = income?.toLocaleString();
  const spendings = spending?.toLocaleString();
  const Total = new Intl.NumberFormat('ko-KR');

  // amount만 모아둔 배열 생성
  const getLists = async (year: number, month: number, userId: string) => {
    const res = await getCalendar(year, month, userId);
    const newRes: IContentExtend[][] = Object.values(res);
    const newArray: number[] = [];
    newRes.forEach((item) => {
      if (item) {
        item.forEach((i) => {
          newArray.push(i.amount);
        });
      }
    });
    return newArray;
  };

  // 수입 계산
  const getIncome = (Lists: number[]) => {
    const Income = Lists.filter((item) => item >= 0);
    const TotalIncome = Income.reduce((acc, cur) => acc + cur, 0);
    return TotalIncome;
  };

  // 지출 계산
  const getSpending = (Lists: number[]) => {
    const Spending = Lists.filter((item) => item < 0);
    const TotalSpending = Spending.reduce((acc, cur) => acc + cur, 0);
    return TotalSpending;
  };

  // 수입과 지출, 합산 금액을 state에 저장
  const monthAmount = useCallback(
    async (year: number, month: number, userId: string) => {
      const Lists = await getLists(year, month, userId);

      const TotalIncome = getIncome(Lists);
      const TotalSpending = getSpending(Lists);
      const AmountTotal = TotalIncome + TotalSpending;

      if (month === Month) {
        setIncome(TotalIncome);
        setSpending(TotalSpending);
        setThisMonth(AmountTotal);
      } else if (month === LastMonth) {
        setLastIncome(TotalIncome);
        setLastSpending(TotalSpending);
        setLastMonth(AmountTotal);
      }
    },
    [LastMonth, Month]
  );

  useEffect(() => {
    monthAmount(FullYear, Month, 'toy2_team4');
    monthAmount(FullYear, LastMonth, 'toy2_team4');
  }, [FullYear, monthAmount, Month, LastMonth, change]);

  return (
    <Container>
      <Wrapper>
        <Title $IncomeColor>{Month}월 수입</Title>
        <Money $IncomeColor>{incomes}</Money>
        <Compare $IncomeColor>
          {Month - 1}월 대비{' '}
          {Total.format(Math.abs((income ?? 0) - (lastIncome ?? 0)))}원{' '}
          {(income ?? 0) - (lastIncome ?? 0) < 0 ? '▼' : '▲'}
        </Compare>
      </Wrapper>
      <Line />
      <Wrapper>
        <Title $SpendingColor>{Month}월 지출</Title>
        <Money $SpendingColor>{spendings}</Money>
        <Compare $SpendingColor>
          {Month - 1}월 대비{' '}
          {Total.format(Math.abs((spending ?? 0) - (lastSpending ?? 0)))}원{' '}
          {(spending ?? 0) - (lastSpending ?? 0) < 0 ? '▲' : '▼'}
        </Compare>
      </Wrapper>
      <Line />
      <Wrapper>
        <Title>합계</Title>
        <Money>{Total.format(thisMonth as number)}</Money>
        <Compare>
          {Month - 1}월 대비{' '}
          {Total.format(Math.abs((thisMonth ?? 0) - (lastMonth ?? 0)))}원{' '}
          {(thisMonth ?? 0) - (lastMonth ?? 0) < 0 ? '▼' : '▲'}
        </Compare>
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
  width: 100%;
  padding: 20px 20px 10px;
  background-color: ${theme.colors.black.black100};
  border-radius: 40px;
  box-shadow: 5px 5px 15px ${theme.colors.black.black50};
  font-family: 'poppins';
  text-align: left;
  font-weight: 400;
  word-spacing: -0.1em;
`;

const Wrapper = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.h2<IColorProps>`
  font-size: 1rem;

  ${({ $IncomeColor, $SpendingColor, theme }) => css`
    color: ${$IncomeColor
      ? theme.colors.blue.main
      : $SpendingColor
      ? theme.colors.red
      : theme.colors.white};
  `}
`;

const Money = styled.h2<IColorProps>`
  font-size: 2rem;
  font-weight: 800;

  ${({ $IncomeColor, $SpendingColor, theme }) => css`
    color: ${$IncomeColor
      ? theme.colors.blue.main
      : $SpendingColor
      ? theme.colors.red
      : theme.colors.white};
  `}
`;

const Compare = styled.span<IColorProps>`
  ${({ $IncomeColor, $SpendingColor, theme }) => css`
    color: ${$IncomeColor
      ? theme.colors.blue.main
      : $SpendingColor
      ? theme.colors.red
      : theme.colors.white};
  `}
  font-size: .8rem;
  opacity: calc(0.2);
  &:hover {
    transition: 0.3s;
    opacity: 1;
  }
`;

const Line = styled.div`
  border-left: 1px solid ${theme.colors.white};
  height: 63px;
  border: 1px solid ${theme.colors.black.black50};
  mix-blend-mode: multiply;
`;
