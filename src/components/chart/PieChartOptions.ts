import { ChartOptions } from 'chart.js'

// Chart Data 속성 지정 - Pie Chart
export const pieOptions: ChartOptions<'pie'> = {
  responsive: true, // 반응형으로 크기 조절
  maintainAspectRatio: false, // chart를 그리는 canvas 태그의 크기 조절
  plugins: {
    legend: {
      display: true, // 차트 범례 표시 여부
      labels: {
        usePointStyle: true, // 범례 포인트 스타일 사용 여부
        pointStyle: 'rectRounded', // 범례 아이콘 스타일링
        boxWidth: 15, // 범례 아이콘 너비
        font: {
          family: 'TheJamsil3Regular',
          size: 20 // 범례 텍스트 폰트 크기
        },
        color: '#2d2c2c'
      },
      position: 'top' // 범례 출력 위치
    },
    datalabels: {
      // chartjs-plugin-datalabels 라이브러리 지원 속성
      display: true, // 데이터 레이블 표시 여부
      align: 'end', // 데이터 레이블 정렬
      font: {
        family: 'TheJamsil3Regular',
        size: 20
      },
      color: '#000', // 데이터 레이블 텍스트 색상
      formatter: function (value: any, context: any) {
        // 데이터 레이블 텍스트를 출력하는 형태를 함수로 지정
        // label : 차트 항목에 해당하는 category 이름 가져오기
        // total : dataset의 총합
        // percentage : 전체 값에 대한 차트 항목 값의 백분율
        const label = context.chart.data.labels[context.dataIndex]
        const total = context.dataset.data.reduce(
          (sum: number, dataValue: number) => sum + dataValue,
          0
        )

        if (total === 0) {
          return `${label}\n0%`
        }

        const percentage = ((value / total) * 100).toFixed(1)

        if (parseFloat(percentage) < 5) {
          return '' // 차트 항목이 5% 미만인 경우 데이터 레이블 표시 X
        }

        return `${label}\n${percentage}%`
      }
    }
  }
}
