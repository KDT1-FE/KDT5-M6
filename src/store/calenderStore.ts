import { create } from 'zustand'
import api from '@/clientAPI'
import { Expense, ExpenseCalendar } from '@/types/api'

interface CalendarStore {
  fullExpenses: Expense[]
  monthlyExpenses: ExpenseCalendar
  getCalendar: (year: number, month: number, userId: string) => void
  getFullExpenses: (userId: string) => void
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  fullExpenses: [] as Expense[],
  monthlyExpenses: {} as ExpenseCalendar,

  // * 월별 소비 목록을 가져온다.
  getCalendar: async (year: number, month: number, userId: string) => {
    const { data } = await api.get<ExpenseCalendar>(
      `api/expenses/calendar?year=${year}&month=${month}&userId=${userId}`
    )
    set({
      monthlyExpenses: data
    })
  },

  // * 전체 소비 목록 가져을 가져온다.
  getFullExpenses: async (userId: string) => {
    const { data } = await api.get<Expense[]>(`api/expenses/search?userId=${userId}`)
    set({
      fullExpenses: data
    })
  }
}))
