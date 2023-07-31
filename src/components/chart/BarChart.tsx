import React from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'

const BarChart = ({ chartData, options }: any) => {
  Chart.register(CategoryScale)

  return <Bar data={chartData} options={options} />
}

export default BarChart
