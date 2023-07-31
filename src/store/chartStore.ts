import api from '@/clientAPI'
import { Expense, ExpensePeriod, ExpenseSummary } from '@/types/api'
import { create } from 'zustand'

interface categoriesData {
  categorie: string
  totalAmount: number
}

interface CHART {
  categories: string[]
  daily: ExpenseSummary[]
  weekly: ExpenseSummary[]
  monthly: ExpenseSummary[]
  calendar: Expense[]
  categorieData: Expense[]
  undefinedCategorieData: Expense[]
  categoriesData: categoriesData[]

  isCategoriesLoding: boolean
  isExpensesLoding: boolean
  isCalendarLoding: boolean
  isCategorieDataLoding: boolean

  getCategories(userId: string): void
  getExpenses(period: ExpensePeriod, userId: string): void
  getCalendar(year: number, month: number, userId: string): void
  getCategorieData(categorie: string, userId: string): void
}

export const chartStore = create<CHART>((set) => ({
  categories: [],
  daily: [],
  weekly: [],
  monthly: [],
  calendar: [],
  categorieData: [],
  undefinedCategorieData: [],
  categoriesData: [],
  isCategoriesLoding: false,
  isExpensesLoding: false,
  isCalendarLoding: false,
  isCategorieDataLoding: false,
  getCategories: async (userId: string) => {
    set({ isCategoriesLoding: true })
    const res = await api(`/api/categories?userId=${userId}`)
    set({ categories: res.data, isCategoriesLoding: false })
  },

  getExpenses: async (period: ExpensePeriod, userId: string) => {
    set({ isExpensesLoding: true })
    const res = await api(`/api/expenses/summary?period=${period}&userId=${userId}`)

    let expenses: { [key in ExpensePeriod]?: ExpenseSummary[] } = {}
    expenses[period] = res.data
    set(expenses)
    set({ isExpensesLoding: false })
  },

  getCalendar: async (year: number, month: number, userId: string) => {
    set({ isCalendarLoding: true })
    const res = await api(`/api/expenses/calendar?year=${year}&month=${month}&userId=${userId}`)

    let oneMonthCalender: Expense[] = []
    for (const key in res.data) {
      oneMonthCalender = oneMonthCalender.concat(res.data[key])
    }

    let categories: string[] = [
      ...new Set(
        oneMonthCalender.map((data) => {
          return data.category
        })
      )
    ]

    let categoriesData: categoriesData[] = []

    for (let i = 0; i < categories.length; i++) {
      categoriesData[i] = { categorie: categories[i], totalAmount: 0 }

      oneMonthCalender.map((data: Expense) => {
        if (data.category === categories[i]) {
          categoriesData[i].totalAmount = categoriesData[i].totalAmount + data.amount
        }
      })
    }

    categoriesData.sort((a: categoriesData, b: categoriesData): number => {
      if (a.totalAmount > b.totalAmount) {
        return -1
      } else if (a.totalAmount < b.totalAmount) {
        return 1
      } else {
        return 0
      }
    })

    set({
      calendar: oneMonthCalender,
      categoriesData: categoriesData
    })
    set({ isCalendarLoding: false })
  },

  getCategorieData: async (categorie: string, userId: string) => {
    set({ isCategorieDataLoding: true })
    const res = await api(`/api/expenses/search?q=${categorie}&userId=${userId}`)

    res.data.sort((a: Expense, b: Expense): number => {
      if (a.date! < b.date!) {
        return -1
      } else if (a.date! < b.date!) {
        return 1
      } else {
        return 0
      }
    })

    if (categorie === '미지정') {
      set({
        undefinedCategorieData: res.data
      })
      set({ isCategorieDataLoding: false })
      return
    }
    set({
      categorieData: res.data
    })
    set({ isCategorieDataLoding: false })
  }
}))
