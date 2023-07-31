import { Calendar } from 'types/index'

type ExpensesData = {
  [day: string]: Calendar[]
}

export interface WeeklyExpenses extends Array<Calendar[]> {}

// 입력된 지출 데이터를 주간 지출 데이터로 계산하는 함수
export const calculateWeekly = (expensesData: ExpensesData) => {
  let weeklyExpenses: WeeklyExpenses = []

  // 주수를 계산하는 함수
  const getWeekNumber = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstWeekday = firstDayOfMonth.getDay() || 7
    const offsetDate = date.getDate() + firstWeekday - 1
    return Math.floor(offsetDate / 7)
  }

  // 지출 데이터를 주수에 맞게 그룹화하여 주간 지출 데이터 생성
  Object.keys(expensesData).forEach(day => {
    const dayExpenses = expensesData[day]
    const date = new Date(dayExpenses[0].date)
    const weekNumber = getWeekNumber(date)

    // 해당 주가 존재하지 않으면 빈 배열로 초기화
    if (!weeklyExpenses[weekNumber]) {
      weeklyExpenses[weekNumber] = []
    }

    // 해당 주의 배열에 일별 지출 항목 추가
    weeklyExpenses[weekNumber].push(...dayExpenses)
  })

  return weeklyExpenses
}
