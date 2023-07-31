import React, { useMemo } from 'react'
import { IWeeklyHistory } from 'types/index'
import { getUserData } from 'utils/index'

import { styled } from 'styled-components'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import moment, { Moment } from 'moment'
import 'moment/locale/ko'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

type ChartCardProps = {
  weeklyDatas: IWeeklyHistory[]
  loading: boolean
}

export const ChartCard = React.memo(({ weeklyDatas, loading }: ChartCardProps) => {
  const user = getUserData()?.displayName
  const startDay = moment().startOf('week')

  const weekOfMonth = (m: Moment) => m.week() - moment(m).startOf('month').week() + 1
  const nowDate = moment().utc(true)

  const labels = [
    `${startDay.format('MM-DD').toString()}`,
    `${startDay.day(1).format('MM-DD').toString()}`,
    `${startDay.day(2).format('MM-DD').toString()}`,
    `${startDay.day(3).format('MM-DD').toString()}`,
    `${startDay.day(4).format('MM-DD').toString()}`,
    `${startDay.day(5).format('MM-DD').toString()}`,
    `${startDay.day(6).format('MM-DD').toString()}`
  ]

  const expendTotalList = useMemo(() => {
    return weeklyDatas.map(data =>
      data.histories.reduce((acc, cur) => {
        if (cur.amount < 0) {
          return acc + -cur.amount
        } else {
          return acc
        }
      }, 0)
    )
  }, [weeklyDatas])

  const incomeTotalList = useMemo(() => {
    return weeklyDatas.map(data => {
      return data.histories.reduce((acc, cur) => {
        if (cur.amount > 0) {
          return acc + cur.amount
        } else {
          return acc
        }
      }, 0)
    })
  }, [weeklyDatas])

  const maxIncomePrice = useMemo(() => Math.max(...incomeTotalList), [incomeTotalList])
  const maxExpendPrice = useMemo(() => Math.max(...expendTotalList), [expendTotalList])

  const options = {
    redraw: true,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    scales: {
      수입: {
        ticks: { stepSize: 5000 },
        max: Math.ceil(Math.max(maxIncomePrice, maxExpendPrice) / 5000) * 5000,
        grid: {
          color: '#555555'
        }
      },
      지출: {
        display: false,
        ticks: { stepSize: 5000 },
        grid: {
          drawOnChartArea: false
        },
        max: Math.ceil(Math.max(maxIncomePrice, maxExpendPrice) / 5000) * 5000
      },
      x: {
        grid: {
          color: '#555555'
        }
      }
    }
  }

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: '수입',
          data: incomeTotalList,
          borderColor: 'rgb(255, 19, 70)',
          backgroundColor: 'rgba(255, 19, 70, 0.6)',
          yAxisID: '수입'
        },
        {
          label: '지출',
          data: expendTotalList,
          borderColor: 'rgb(23, 134, 208)',
          backgroundColor: 'rgba(23, 134, 208, 0.6)',
          yAxisID: '지출'
        }
      ]
    }
  }, [expendTotalList, incomeTotalList])

  return (
    <Card>
      <h4>
        {user ? `${user}님의` : '나의 '}
        {`${nowDate.format('M월 ')} ${weekOfMonth(nowDate)}주차 주간 분석`}
      </h4>
      <p className="total">
        <span>수입 {incomeTotalList.reduce((acc, cur) => (acc += cur), 0).toLocaleString()}원</span>
        <span>
          지출 {expendTotalList.reduce((acc, cur) => (acc += cur), 0).toLocaleString()} 원
        </span>
      </p>
      {loading ? null : (
        <Line
          options={options}
          data={data}
        />
      )}
    </Card>
  )
})

const Card = styled.div`
  border-radius: 24px;
  width: 100%;
  background-color: #2f2f2f;
  padding: 20px 20px 40px 20px;

  h4 {
    font-size: 16px;
    color: #eee;
  }

  p.total {
    margin-top: 16px;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-white);
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
  }
`
