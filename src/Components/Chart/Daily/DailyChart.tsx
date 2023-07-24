import DailyCalories from "./DailyCalories";
import DailySavings from "./DailySavings";

interface DailyChartProps {
  activeDaily: string;
}

const DailyChart: React.FC<DailyChartProps> = ({ activeDaily }) => {
  return (
    <div>
      <DailyCalories activeDaily={activeDaily} />
      <DailySavings activeDaily={activeDaily} />
    </div>
  );
}

export default DailyChart;