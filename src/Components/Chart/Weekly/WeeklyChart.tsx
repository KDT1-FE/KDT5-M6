import WeeklyCalories from "./WeeklyCalories";
import WeeklySavings from "./WeeklySavings";

interface WeeklyChartProps {
  activeWeek: string;
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ activeWeek }) => {
  return (
    <div>
      <WeeklyCalories activeWeek={activeWeek} />
      <WeeklySavings activeWeek={activeWeek} />
    </div>
  );
}

export default WeeklyChart;