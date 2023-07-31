import { ChartOptions, ChartDataset } from 'chart.js'

declare module 'chart.js' {
  interface PieDatasetOptions {
    // 사용자 정의 데이터셋 옵션 추가를 위한 인터페이스
    datasetOptions?: ChartDataset
  }

  interface ChartTypeRegistry {
    // Chart.js에서 새로운 차트 유형을 등록하기 위한 인터페이스
    customPie: {
      // 사용자 정의 차트 유형 추가
      chartOptions?: ChartOptions<'pie'> // 해당 차트 유형에 대한 옵션 지정
      datasetOptions?: PieDatasetOptions // 데이터셋에 대한 옵션 지정
    }
  }
}
