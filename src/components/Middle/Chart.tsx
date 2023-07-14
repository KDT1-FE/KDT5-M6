import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { getPeriod, IContentExtend } from '../../lib/API';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js/auto'; //미사용하지만 안적어주면 오류남
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 차트 : 해당 월의 주차별 지출 데이터
// 일별, 주별, 월별 소비 조회 API Request:
// GET /expenses/summary?period={period}&userId={userId}
// period : daily, weekly, monthly

interface ICalendarProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}
interface IContentExtendPeriod {
  _id: string;
  totalAmount: number;
}

function extractData(data: IContentExtendPeriod[], currentMonth: number): {
  month: string;
  plus: number;
  minus: number;
} {
  // const currentDate = new Date();
  // const currentMonth = currentDate.getMonth() + 1;
  let plusTotal = 0;
  let minusTotal = 0;

  data.forEach((item) => {
    const itemDate = new Date(item._id);
    const itemMonth = itemDate.getMonth() + 1;

    if (itemMonth === currentMonth) {
      if (item.totalAmount >= 0) {
        plusTotal += item.totalAmount;
      } else {
        minusTotal += item.totalAmount;
      }
    }
  });
  return { month: currentMonth.toString(), plus: plusTotal, minus: minusTotal };
}

function Chart({ date, setDate }: ICalendarProps) {
  const [content, setContent] = useState<IContentExtend[]>([]);
  const [monthlyAmount, setMonthlyAmount] = useState<{
    plus: number;
    minus: number;
  }>({ plus: 0, minus: 0 });

  useEffect(() => {
    const fetchData = async (period: string) => {
      try {
        const userId = 'user123'; // 사용자 ID에 맞게 변경
        const res = await getPeriod(period, userId);
        setContent(res);
        console.log(`🤔 Data for ${period}:`, res); // 데이터 콘솔에 출력

        const currentMonth = date.getMonth() + 1;
        const { month, plus, minus } = extractData(res, currentMonth); // 데이터 추출
        setMonthlyAmount({ plus, minus });
        console.log(`📊 Monthly data for ${month}:`, { plus, minus });
      } catch (error) {
        console.log(`Error fetching data for ${period}:`, error);
      }
    };

    const periods = ['daily'];
    periods.forEach((period) => {
      fetchData(period);
    });
  }, [date]);

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
      // title: {
      //   display: true,
      //   text: '이달의 수입 & 지출'
      // },
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
    // labels: ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'],
    datasets: [
      {
        type: 'bar',
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
