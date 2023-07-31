import { create } from 'zustand'
import { Calendar } from 'types/index'
import { deleteExpense, updateExpense } from 'apis/index'
import { User } from '@firebase/auth'

const initialUserData = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData') || '{}')
  : {}

interface IStore {
  expensesData: Calendar[][]
  setExpensesData: (expenses: Calendar[][]) => void
  userData: User
  setUserData: (data: User) => void
  removeExpense: (weekIndex: number, expenseIndex: number, expenseId: string) => Promise<void>
  updateExpense: (
    weekIndex: number,
    expenseIndex: number,
    updatedExpense: Calendar,
    expenseId: string
  ) => Promise<void>
}

export const useStore = create<IStore>(set => ({
  expensesData: [],
  setExpensesData: (expenses: Calendar[][]) => {
    set({ expensesData: expenses })
  },
  userData: initialUserData,
  setUserData: (data: User) => {
    set({ userData: data })
    localStorage.setItem('userData', JSON.stringify(data))
  },

  // 제거
  removeExpense: async (weekIndex: number, expenseIndex: number, expenseId: string) => {
    await deleteExpense(expenseId)
    set(state => {
      const newExpenses = state.expensesData.map((weekExpenses: Calendar[], index: number) => {
        return index === weekIndex
          ? weekExpenses.filter((_, index: number) => {
              return index !== expenseIndex
            })
          : weekExpenses
      })
      return { expensesData: newExpenses }
    })
  },
  // 업데이트
  updateExpense: async (
    weekIndex: number,
    expenseIndex: number,
    updatedExpense: Calendar,
    expenseId: string
  ) => {
    await updateExpense(updatedExpense, expenseId)
    set(state => {
      const newExpenses = state.expensesData.map((weekExpenses: Calendar[], index: number) => {
        return index === weekIndex
          ? weekExpenses.map((expense, idx) => {
              return idx === expenseIndex ? updatedExpense : expense
            })
          : weekExpenses
      })
      return { expensesData: newExpenses }
    })
  }
}))
