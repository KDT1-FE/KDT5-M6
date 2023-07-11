import { useState, useEffect } from 'react';
import { formatDate } from '../../lib/CommonFunc';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';


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

function Chart({ date, setDate }: ICalendarProps) {
  const options = {
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
            family: 'Noto Sans KR'
          }
        },
        position: 'top' as const
      },
      title: {
        display: true,
        text: '어휴...어려워..'
      },
      scales: {
        x: {
          grid: {
            color: '#F8F9FD'
          }
        },
        y: {
          grid: {
            color: '#F8F9FD'
          }
        }
      }
    }
  };

  // 이러지마 제발...원하는게 뭐야
  const data: ChartData<
    'bar',
    ChartDataset<'bar', { x: string; y: number }>
  > = {
    // x : 주별 지출 금액 표기
    labels: ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'],
    datasets: [
      {
        type: 'bar',
        label: '단위 : 만 원',
        // y : 지출 data 들어가는 자리
        data: [
          { x: '첫째주', y: 20 },
          { x: '둘째주', y: 50 },
          { x: '셋째주', y: 3 },
          { x: '넷째주', y: 40 },
          { x: '다섯째주', y: 70 },
          { x: null, y: 100 }
        ],
        backgroundColor: '#4464FF'
      }
    ]
  };

  return (
    <ChartGraph>
      <Bar data={data} options={options} width="95%" height="70%" />
    </ChartGraph>
  );
}

const ChartGraph = styled.div`
  margin: 5%;
  width: 90%;
  height: 100%;
`;

export default Chart;
