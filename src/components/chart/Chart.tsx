import styled from "styled-components";
import DailyChart from "./DailyChart";
// import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import WeeklyChart from "./WeeklyChart";
// import WeeklyChart from "./WeeklyChart";

export interface IExpense {
  _id: string;
  totalAmount: number;
}

function Chart() {
  return (
    <ChartContainer>
      <DailyChart />
      <WeeklyChart />
      <MonthlyChart />
    </ChartContainer>
  );
}

const ChartContainer = styled.div`
  width: 480px;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 14px;
`;

export default Chart;
