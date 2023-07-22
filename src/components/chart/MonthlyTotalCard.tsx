import React, { useMemo } from 'react'
import { ICalendarResponse } from 'types/index'
import { getUserData } from 'utils/index'

import { styled } from 'styled-components'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import moment from 'moment'
import 'moment/locale/ko'

ChartJS.register(ArcElement, Tooltip, Legend)

type MonthlyTotalCardProps = {
  monthlyData: ICalendarResponse[]
}

export const MonthlyTotalCard = React.memo(({ monthlyData }: MonthlyTotalCardProps) => {
  const user = getUserData()?.displayName
  const nowDate = moment().utc(true)

  const expendTotalPrice = useMemo(() => {
    return monthlyData.reduce((acc, cur) => {
      if (cur.amount < 0) {
        return acc + -cur.amount
      }
      return acc
    }, 0)
  }, [monthlyData])

  const incomeTotalPrice = useMemo(() => {
    return monthlyData.reduce((acc, cur) => {
      if (cur.amount > 0) {
        return acc + cur.amount
      }
      return acc
    }, 0)
  }, [monthlyData])

  const data = useMemo(() => {
    return {
      labels: ['수입', '지출'],
      datasets: [
        {
          data: [incomeTotalPrice, expendTotalPrice],
          backgroundColor: ['rgba(255, 19, 70, 0.6)', 'rgba(23, 134, 208, 0.6)'],
          borderColor: ['rgb(255, 19, 70)', 'rgb(23, 134, 208)'],
          borderWidth: 1
        }
      ]
    }
  }, [expendTotalPrice, incomeTotalPrice])

  return (
    <Card>
      <h3>
        {user ? `${user}님의` : '나의 '}
        {`${nowDate.format('M월 ')} 자산 분석`}
      </h3>
      <p className="total">
        <span>수입 {incomeTotalPrice.toLocaleString()}원</span>
        <span>지출 {expendTotalPrice.toLocaleString()} 원</span>
      </p>
      <ChartWrapper>
        {monthlyData ? <Pie data={data} /> : <h4>월간 자산 데이터가 없습니다.</h4>}
      </ChartWrapper>
    </Card>
  )
})

const Card = styled.div`
  border-radius: 24px;
  width: 100%;
  background-color: #2f2f2f;
  padding: 20px 20px 40px 20px;

  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #eee;
  }

  p.total {
    margin-top: 22px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: var(--color-white);
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  h4 {
    font-size: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #eee;
  }
`

const ChartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  canvas {
    max-width: 400px;
    max-height: 400px;
  }
`
