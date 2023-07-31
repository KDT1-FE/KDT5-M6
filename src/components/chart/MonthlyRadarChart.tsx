import React, { useMemo } from 'react'
import { ICalendarResponse } from 'types/index'
import { chartCategory } from 'constants/index'
import { calculateExpend } from 'utils/index'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

type MonthlyRadarChartProps = {
  monthlyData: ICalendarResponse[]
}

export const MonthlyRadarChart = React.memo(({ monthlyData }: MonthlyRadarChartProps) => {
  const categories = chartCategory.map(category => category.category)

  const chartData = useMemo(() => {
    const totalExpendListByCategory = categories.map(category =>
      calculateExpend(monthlyData.filter(data => data.category === category))
    )
    console.log(totalExpendListByCategory)
    return {
      labels: categories,
      datasets: [
        {
          label: '총 지출 금액',
          data: totalExpendListByCategory,
          backgroundColor: 'rgba(19, 199, 28, 0.2)',
          borderColor: 'rgba(19, 199, 28, 1)',
          borderWidth: 1
        }
      ]
    }
  }, [monthlyData])

  return (
    <>
      <h3>카테고리별 월 지출 분석</h3>
      <Radar
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            r: {
              ticks: {
                display: false,
                stepSize: Math.max(...chartData.datasets[0].data) / 5
              },
              grid: {
                color: '#555555'
              },
              angleLines: {
                color: '#555555'
              }
            }
          },
          layout: {
            padding: {
              left: 20,
              top: 20,
              right: 20,
              bottom: 20
            }
          }
        }}
      />
    </>
  )
})
