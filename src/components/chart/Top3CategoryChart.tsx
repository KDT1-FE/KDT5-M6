import React, { useMemo } from 'react'
import { ICalendarResponse } from 'types/index'
import { chartCategory } from 'constants/index'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement)

type Top3CategroyChartProps = {
  monthlyData: ICalendarResponse[]
}

interface CategoryTotalExpend {
  category: string
  totalExpend: number
}

export const Top3CategoryChart = React.memo(({ monthlyData }: Top3CategroyChartProps) => {
  if (!monthlyData) {
    return null
  }
  const categories = chartCategory.map(category => category.category)

  const chartData = useMemo(() => {
    const categoryiseData = [] as CategoryTotalExpend[]
    categories.map(category => {
      categoryiseData.push({
        category: category,
        totalExpend: monthlyData
          .filter(data => data.category === category)
          .reduce((acc, cur) => {
            if (cur.amount < 0) {
              acc += cur.amount
            }
            return acc
          }, 0)
      })
    })

    const top3List = categoryiseData.sort((a, b) => a.totalExpend - b.totalExpend).slice(0, 3)

    return {
      labels: top3List.map(data => data.category),
      datasets: [
        {
          label: '지출 금액',
          data: top3List.map(data => -data.totalExpend),
          backgroundColor: [
            'rgba(227, 65, 100, 0.5)',
            'rgba(30, 96, 162, 0.5)',
            'rgba(92, 243, 122, 0.5)'
          ],
          maxBarThickness: 40,
          offset: 100
        }
      ]
    }
  }, [monthlyData])

  const options = useMemo(() => {
    if (!chartData) {
      return null
    }
    const maxPrice = Math.ceil(chartData.datasets[0].data[0] / 5000) * 5000 + 5000
    return {
      maintainAspectRatio: true,
      aspectRatio: 1,
      responsive: true,
      scales: {
        y: {
          max: maxPrice,
          ticks: {
            stepSize: maxPrice / 5,
            callback: (value: unknown) => `${(value as number).toLocaleString()}원`
          },
          beginAtZero: true,
          grid: {
            color: '#555555'
          }
        },
        x: {
          grid: {
            color: '#555555'
          }
        }
      },
      layout: {
        padding: {
          left: 0,
          top: 20,
          right: 0,
          bottom: 20
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  }, [chartData])

  return (
    <>
      <h3>지출 TOP 3 카테고리</h3>
      {chartData && options && (
        <Bar
          updateMode="resize"
          options={options}
          data={chartData}
        />
      )}
    </>
  )
})
