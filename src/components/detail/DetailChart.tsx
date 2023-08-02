import {useEffect, useRef} from 'react'
import Chart, {ChartType} from 'chart.js/auto';
import styled from 'styled-components';

interface Summaries {
  summaries: SummaryResponseItem[]
  period: string
  selectChart: string
}

function DeatilChart({summaries, period, selectChart}: Summaries) {

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartLabels = summaries.map((item) => {
      if(period === 'monthly') {
        const [year, month] = item._id.split('-')
        return `${year}년 ${month}월`
      } else if ( period === 'weekly'){
        const weekNum = item._id.split('-')[1]
        return `주${weekNum}`
      } else if ( period === 'daily') {
        const [, monthNum, dayNum] = item._id.split('-')
        return `${monthNum}월 ${dayNum}일`
      }
    })

    const dynaminColor = function () {
      const r: number = Math.floor(Math.random() * 255)
      const g: number = Math.floor(Math.random() * 255)
      const b: number = Math.floor(Math.random() * 255)
      return 'rgba(' + r + ',' + g + ',' + b + ',0.6)'
    }

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: '지출 내역',
          data: summaries.map((item) => item.totalAmount), // 각 주에 해당하는 지출 데이터
          backgroundColor: summaries.map(() => dynaminColor()), // 차트 영역 배경색
          borderColor: 'rgba(75, 192, 192, 1)', // 차트 선 색상
          borderWidth: 2, // 차트 선 두께
        },
      ],
    };
    // 차트 옵션
    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1000, // y 축 간격
          },
        },
      },
    };

    // 차트 생성
    const chartType = selectChart as ChartType
    const myChart = new Chart(chartRef.current, {
      type: chartType,
      data: chartData,
      options: chartOptions,
    });

    // 컴포넌트 언마운트 시 차트 인스턴스 제거
    return () => {
      myChart.destroy();
    };

  }, [summaries, period, selectChart]);

  return (
    <div>
      <StyledCanvas ref = {chartRef} />
    </div>
  )
}

export default DeatilChart

const StyledCanvas = styled.canvas`
  max-height: 250px;
  margin-bottom: 40px;
`