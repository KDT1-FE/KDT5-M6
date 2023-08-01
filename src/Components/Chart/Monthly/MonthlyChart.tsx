import MonthlyCalories from "./MonthlyCalories";
import MonthlySavings from "./MonthlySavings";

interface MonthlyChartProps {
  activeMonth: string;
}

const MonthlyChart: React.FC<MonthlyChartProps> = ({ activeMonth }) => {
  return (
    <div>
      <MonthlyCalories activeMonth={activeMonth} />
      <MonthlySavings activeMonth={activeMonth} />
    </div>
  );
};

export default MonthlyChart;
