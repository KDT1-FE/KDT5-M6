import React, { useEffect, useState } from 'react'
import { MonthlyTotalCard, Top3CategoryChart, MonthlyRadarChart } from 'components/index'
import { getWeeklyData } from 'apis/index'
import { ICalendarResponse } from 'types/index'
import { getTodayYearMonth, getUserData } from 'utils/index'

import { styled } from 'styled-components'

export const MonthlyChart = React.memo(() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [monthlyHistories, setMonthlyHistories] = useState<ICalendarResponse[]>([])

  useEffect(() => {
    const todayYearMonth = getTodayYearMonth()
    setLoading(true)
    getWeeklyData({
      ...todayYearMonth,
      userId: getUserData()?.email ?? ''
    }).then(res => {
      const histories = [] as ICalendarResponse[]
      const monthlyData = Object.entries(res)
      monthlyData.forEach(data => histories.push(...(data[1] as ICalendarResponse[])))
      setMonthlyHistories(histories)
      console.log(histories)
      setLoading(false)
    })
  }, [])

  return (
    <Container>
      {loading ? null : <MonthlyTotalCard monthlyData={monthlyHistories} />}
      <AnalyzeBox>
        <Box>
          <div className="inner">
            {monthlyHistories.length > 0 ? (
              loading ? null : (
                <Top3CategoryChart monthlyData={monthlyHistories} />
              )
            ) : (
              <h4>데이터가 없습니다.</h4>
            )}
          </div>
        </Box>
        <Box>
          <div className="inner">
            {monthlyHistories.length > 0 ? (
              loading ? null : (
                <MonthlyRadarChart monthlyData={monthlyHistories} />
              )
            ) : (
              <h4>데이터가 없습니다.</h4>
            )}
          </div>
        </Box>
      </AnalyzeBox>
    </Container>
  )
})

const Container = styled.div`
  width: 100%;
  padding: 20px 24px;
`
const AnalyzeBox = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`
const Box = styled.div`
  position: relative;
  width: 100%; /* 원하는 너비 */

  &:before {
    content: '';
    display: block;
    padding-top: 100%; /* 1:1 비율 */
  }

  .inner {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border-radius: 24px;
    background-color: #2f2f2f;
    color: var(--color-white);

    h3 {
      text-align: center;
    }

    p {
      font-size: 18px;
      text-align: center;
      margin-bottom: 20px;
    }

    span {
      font-size: 20px;

      &.percent {
        background-color: rgba(241, 17, 17, 0.3);
        padding: 4px;
      }

      &.highlight {
        color: red;
      }
    }

    h4 {
      font-size: 20px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`
