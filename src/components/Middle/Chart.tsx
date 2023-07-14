import { useCallback, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getCalendar, IContentExtend } from '../../lib/API';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js/auto'; //미사용하지만 안적어주면 오류남
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function Chart({ date }: ICalendarProps) {
  const [monthlyAmount, setMonthlyAmount] = useState<{
    plus: number;
    minus: number;
  }>({ plus: 0, minus: 0 });

  const Month = new Date(date).getMonth() + 1;
  const FullYear = new Date(date).getFullYear();

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

      if (month === Month) {
        setMonthlyAmount({ plus: TotalIncome, minus: TotalSpending });
      }
    },
    [Month]
  );

  useEffect(() => {
    monthAmount(FullYear, Month, 'user123');
  }, [FullYear, monthAmount, Month]);

  // minus 값을 +로 변환하여 표시
  const transformedMinus = Math.abs(monthlyAmount.minus);
  // 라이브러리 문법
  const chartOptions = {
    responsive: true,
    // 차트 바의 정보 hover
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    plugins: {
      legend: {
        // 범례 스타일링
        labels: {
          font: {
            // 범례의 폰트 스타일도 지정할 수 있습니다.
            family: 'Noto Sans KR, Poppins'
          }
        },
        position: 'bottom' as const
      },
      scales: {
        x: {
          grid: {
            color: '#4464FF'
          }
        },
        y: {
          grid: {
            color: '#4464FF',
            title: {
              display: true,
              text: 'Y축 제목이 떠야하는데 안뜨네 흑흑'
            }
          }
        }
      }
    }
  };

  const chartData = {
    datasets: [
      {
        label: '₩',
        data: [
          { x: '수입', y: monthlyAmount.plus },
          { x: '지출', y: transformedMinus }
        ],
        backgroundColor: ['#4464FF', '#FF6969']
      }
    ]
  };

  return (
    <ChartGraph>
      {/* 라이브러리 문법 */}
      <Bar data={chartData} options={chartOptions} width="90%" height="60%" />
    </ChartGraph>
  );
}

const ChartGraph = styled.div`
  margin: auto;
  margin-top: 50px;
  /* margin-bottom: 5px; */
  width: 80%;
  max-width: 900px;
`;
export default Chart;
