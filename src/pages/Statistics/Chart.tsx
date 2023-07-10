import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import { Bar } from 'react-chartjs-2';

interface ChartProps {
  data: ChartData<'bar', (number | [number, number] | null)[], unknown>;
}

export default function Chart({ data }: ChartProps) {
  return (
    <Bar
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}
