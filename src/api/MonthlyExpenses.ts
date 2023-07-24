import { baseInstance } from 'api/index'

export const getMonthlyExpenses = async (
  year: number,
  month: number,
  userId: string
): Promise<MonthlyExpenses[]> => {
  try {
    const response = await baseInstance.get(
      `/expenses/calendar?year=${year}&month=${month}&userId=${userId}`
    )
    return response.data
  } catch (error) {
    console.warn(error)
    console.warn('조회실패')
    return []
  }
}

export interface MonthlyExpenses {
  [date: string]: Expense[]
}

export interface Expense {
  _id: string
  amount: number
  userId: string
  category: string
  date: string
  __v: number
}

export interface CalendarEvent {
  title: string
  date?: string
  allDay?: boolean
  start?: string
}
