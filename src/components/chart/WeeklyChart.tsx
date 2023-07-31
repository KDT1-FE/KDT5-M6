import React, { useEffect, useState, useMemo } from 'react'
import { ChartCard } from 'components/index'
import { chartCategory } from 'constants/index'
import { getWeeklyData, getWeeklySummary } from 'apis/index'
import { ICalendarResponse, IWeeklyHistory, ISummaryResponse } from 'types/index'
import {
  getTodayYearMonth,
  getWeekEndDay,
  getWeekStartDay,
  getPrevWeeklyNumber,
  getUserData
} from 'utils/index'

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { styled } from 'styled-components'

ChartJS.register(ArcElement, Tooltip)

interface IWeeklySummary {
  prevTotal: number | null
  currentTotal: number | null
}

export const WeeklyChart = React.memo(() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [weeklyHistories, setWeeklyHistories] = useState<IWeeklyHistory[]>([])
  const [weeklySummary, setWeeklySummary] = useState<IWeeklySummary>({
    prevTotal: null,
    currentTotal: null
  })

  const labels = chartCategory.map(category => category.category)

  const categoriesData = useMemo(() => {
    const allHistories = [] as ICalendarResponse[]
    weeklyHistories.forEach(data => allHistories.push(...data.histories))
    const datas = labels.map(
      category => allHistories.filter(data => data.category === category).length || 0
    )

    return {
      labels: labels,
      datasets: [
        {
          label: '지출 횟수',
          data: datas,
          backgroundColor: chartCategory.map(category => category.bgColor),
          borderColor: chartCategory.map(category => category.borderColor),
          borderWidht: 1
        }
      ]
    }
  }, [weeklyHistories])

  // 주별 지출 합계 내역 조회
  const fetchWeeklySummary = () => {
    getWeeklySummary().then(res => {
      const prevWeek = getPrevWeeklyNumber()
      const prevSummary: ISummaryResponse | null = res.find(
        (data: ISummaryResponse) => parseInt(data._id.split('-')[1]) === prevWeek
      )
      const currentSummary: ISummaryResponse | null = res.find(
        (data: ISummaryResponse) => parseInt(data._id.split('-')[1]) === prevWeek + 1
      )
      const prevTotal = prevSummary?.totalAmount ?? 0
      const currentTotal = currentSummary?.totalAmount ?? 0

      setWeeklySummary({
        prevTotal: prevTotal,
        currentTotal: currentTotal
      })
    })
  }

  useEffect(() => {
    fetchWeeklySummary()
  }, [])

  useEffect(() => {
    const todayYearMonth = getTodayYearMonth()
    setLoading(true)
    getWeeklyData({
      ...todayYearMonth,
      userId: getUserData()?.email ?? ''
    })
      .then(res => {
        const weeklyData = Object.entries(res).filter(entry => {
          return parseInt(entry[0]) >= getWeekStartDay() && parseInt(entry[0]) <= getWeekEndDay()
        })

        const weekDays = Array(7)
          .fill(0)
          .map((_, index) => getWeekStartDay() + index)

        const weeklyHistories: IWeeklyHistory[] = weekDays.map(day => {
          const dayIndex = weeklyData.findIndex(data => parseInt(data[0]) === day)
          if (dayIndex !== -1) {
            return {
              ...todayYearMonth,
              day: day,
              histories: weeklyData[dayIndex][1] as ICalendarResponse[]
            }
          } else {
            return { ...todayYearMonth, day: day, histories: [] as ICalendarResponse[] }
          }
        })

        setLoading(false)
        return weeklyHistories
      })
      .then(histories => setWeeklyHistories(histories))
  }, [])

  return (
    <Container>
      <ChartCard
        weeklyDatas={weeklyHistories}
        loading={loading}
      />
      <AnalyzeBox>
        <Box>
          <div className="inner">
            {categoriesData.datasets[0].data.find(num => num > 0) ? (
              <>
                <h3>카테고리 별 지출 횟수</h3>

                <Doughnut
                  data={categoriesData}
                  options={{
                    plugins: {
                      legend: {
                        display: false
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
            ) : (
              <h4>데이터가 없습니다.</h4>
            )}
          </div>
        </Box>
        <Box>
          {/* 가장 큰 지출 항목 */}
          <div className="inner">
            {weeklySummary.prevTotal !== null && weeklySummary.currentTotal !== null && (
              <div className="compare">
                <p>이번주는 지난주 대비</p>
                <p>
                  {weeklySummary.prevTotal <= weeklySummary.currentTotal ? (
                    <span className="percent">
                      {(weeklySummary.currentTotal - weeklySummary.prevTotal).toLocaleString()}원
                    </span>
                  ) : (
                    <span className="percent">
                      {(weeklySummary.prevTotal - weeklySummary.currentTotal).toLocaleString()}원
                    </span>
                  )}
                </p>
                {weeklySummary.prevTotal <= weeklySummary.currentTotal ? (
                  <p>더 많아요!</p>
                ) : (
                  <p>더 적어요!</p>
                )}
              </div>
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

    padding: 20px;
    border-radius: 24px;
    background-color: #2f2f2f;
    color: var(--color-white);

    h3 {
      text-align: center;
    }

    h4 {
      font-size: 20px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      font-size: 18px;
      text-align: center;
      margin-bottom: 20px;
    }

    div.compare {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;

      p {
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 0;
        line-height: 1.5;
      }

      span {
        font-size: 24px;
        font-weight: 700;

        &.percent {
          background-color: rgba(241, 17, 17, 0.3);
          padding: 4px;
        }

        &.highlight {
          color: red;
        }
      }
    }
  }
`
