import ExpenseList from "@/components/ExpenseList";
import { search } from "@/types/apiTypes";
import { forwardRef } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

interface Props {
  day: string;
  expenseList: search[];
  searchText?: string;
}

interface DayOfWeekProps {
  $dayOfWeek: string;
}

const DailyList = forwardRef<HTMLDivElement, Props>(({ day, expenseList, searchText }: Props, ref) => {
  let expenseTotal = 0;
  let incomeTotal = 0;

  expenseList.forEach((list) => {
    if (list.amount < 0) {
      expenseTotal += list.amount;
    } else {
      incomeTotal += list.amount;
    }
  });

  const dayOfWeek = dayjs(day, "MM.DD").format("ddd");

  return (
    <Container ref={ref} key={day}>
      <DaySummary>
        <Day>
          {day}(<DayOfWeek $dayOfWeek={dayOfWeek}>{dayOfWeek}</DayOfWeek>)
        </Day>
        <AmountsSummary>
          <Amount style={{ color: "var(--point-color-red)" }}>₩{expenseTotal.toLocaleString()}</Amount>
          <Amount style={{ color: "var(--point-color-green)" }}>₩{incomeTotal.toLocaleString()}</Amount>
        </AmountsSummary>
      </DaySummary>

      {expenseList.map((list: search, i: number) => (
        <ExpenseList
          key={i}
          _id={list._id}
          amount={list.amount}
          category={list.category}
          date={list.date}
          searchText={searchText}
        />
      ))}
    </Container>
  );
});

export default DailyList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const DaySummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const Day = styled.span`
  font-size: 0.9em;
  padding-left: 4px;
`;

const DayOfWeek = styled.span<DayOfWeekProps>`
  color: ${(props) => (props.$dayOfWeek === "일" ? "red" : props.$dayOfWeek === "토" ? "blue" : "inherit")};
`;

const AmountsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  width: 45%;
  gap: 8px;
  padding-right: 0px;
  /* background-color: var(--base-color-grey); */
  opacity: 0.8;
  border-radius: 6px;
`;

const Amount = styled.span`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
  font-size: 0.8rem;
  font-weight: 600;
`;
