import { useState, useEffect } from 'react'
import { fetchCalendar } from '@/apis'
import { WeekSummary, DailyExpense } from '@/components'
import { calculateWeekly } from '@/utils'
import { useStore } from '@/store'
import styled from 'styled-components'
import { Calendar } from '@/types'

export const Weekly = () => {
  const weeklyExpenses = useStore(state => state.expensesData)
  const setWeeklyExpenses = useStore(state => state.setExpensesData)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const userData = useStore(state => state.userData)
  const userId = userData.email ?? ''

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1
      // 현재 연도와 월에 해당하는 지출 데이터
      const expensesData = await fetchCalendar(currentYear, currentMonth, userId)
      // 가져온 지출 데이터를 주간 지출 데이터로 변환
      setWeeklyExpenses(calculateWeekly(expensesData))
    }

    fetchData()
  }, [])

  // 주 지출 목록 클릭 시 실행되는 함수
  const handleWeekClick = (weekIndex: number) => {
    // 이미 선택된 주를 다시 클릭하면 선택 해제
    if (selectedWeek === weekIndex) {
      setSelectedWeek(null)
    } else {
      // 다른 주를 클릭하면 해당 주를 선택
      setSelectedWeek(weekIndex)
    }
  }

  return (
    <Container>
      {weeklyExpenses.map((weekExpenses: Calendar[], weekIndex: number) => (
        <>
          {/* 주간 요약 정보 */}
          <WeekSummary
            key={weekIndex}
            weekExpenses={weekExpenses}
            index={weekIndex}
            onClick={() => handleWeekClick(weekIndex)}
            isOpened={selectedWeek === weekIndex}
          />
          {/* 선택된 주의 일별 지출 정보 */}
          {selectedWeek === weekIndex && (
            <DailyExpense
              dailyExpenses={weekExpenses}
              weekIndex={weekIndex}
            />
          )}
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  max-width: 768px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  min-height: calc(100vh - 114px);
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
`
