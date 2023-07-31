import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'

const LineChart = ({ chartData, options }: any) => {
  Chart.register(CategoryScale)

  return <Doughnut data={chartData} options={options} />
}

export default LineChart
