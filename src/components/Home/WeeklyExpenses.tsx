import { theme } from '@/styles/theme';
import { css, styled } from 'styled-components';
import { weekToNumFn } from '@/lib/utils/weekNumFn';

interface WeeklyListProps {
  _id?: string;
  totalAmount?: number;
}
interface WeeklyExpensesProps {
  year?: number;
  month?: number;
  week?: number;
  weeklyList?: WeeklyListProps[];
}

function WeeklyExpenses({ ...props }: WeeklyExpensesProps) {
  const weekOfYear = weekToNumFn(
    props.year as number,
    props.month as number,
    props.week as number,
  );

  // weekOfYear에 해당하는 id값을 찾음
  const targetWeek = props.weeklyList
    ? props.weeklyList.find((target) => target._id === `2023-${weekOfYear}`)
    : undefined;

  // 해당 주차의 totalAmount 저장
  const targetAmount = targetWeek ? targetWeek?.totalAmount : undefined;

  // 주간 거래내역이 있다면, 음수 양수에 따라 구분지어 렌더링, 거래내역이 없다면 non-breaking space
  return (
    <>
      {targetAmount ? (
        <Wrapper $isPositive={(targetAmount as number) > 0}>
          {targetAmount > 0 ? '+' : ''}
          {targetAmount ? targetAmount.toLocaleString() : ''}
        </Wrapper>
      ) : (
        <Wrapper $isPositive={false}>&nbsp;</Wrapper>
      )}
    </>
  );
}
const Wrapper = styled.div<{
  $isPositive?: boolean;
}>`
  display: flex;
  font-size: 0.8rem;
  padding-right: 2px;
  align-items: center;
  justify-content: right;
  background-color: ${theme.colors.gray[0]};
  ${(props) =>
    props.$isPositive &&
    css`
      color: ${theme.colors.deepGreen};
    `}
`;

export default WeeklyExpenses;
