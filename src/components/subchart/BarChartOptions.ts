import { ChartOptions } from 'chart.js'

// Chart labels - Vertical Bar Chart
// barLabels : x축에 출력할 라벨
export const barLabels = ['3월', '4월', '5월', '6월', '7월']

// Chart Data 속성 지정 - Vertical Bar Chart
export const barOptions: ChartOptions<'bar'> = {
  responsive: true, // 반응형으로 크기 조절
  maintainAspectRatio: false, // chart를 그리는 canvas 태그의 크기 조절
  layout: {
    // 차트 레이아웃 속성
    padding: {
      right: 15
    }
  },
  scales: {
    x: {
      // x축 관련 속성
      ticks: {
        font: {
          family: 'TheJamsil1Thin',
          size: 20
        },
        color: '#000'
      }
    },
    y: {
      // y축 관련 속성
      grid: {
        display: false // y축 그리드(선) 출력 X
      },
      ticks: {
        font: {
          family: 'TheJamsil1Thin',
          size: 20
        },
        color: '#000'
      }
    }
  },
  plugins: {
    legend: {
      // 차트 범례 관련 속성
      position: 'top', // 차트 범례 출력 위치
      labels: {
        usePointStyle: true, // 범례 포인트 스타일 사용 여부
        pointStyle: 'rectRounded', // 범례 아이콘 스타일링
        boxWidth: 20, // 범례 아이콘 너비
        font: {
          // 범례 텍스트 관련 속성
          family: 'TheJamsil3Regular',
          size: 18
        },
        color: '#000' // 범례 텍스트 색상은 props 사용 불가능, 직접 코드 지정
      }
    }
  }
}
