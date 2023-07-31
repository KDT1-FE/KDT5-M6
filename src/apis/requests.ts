import axios from 'axios'
import { AxiosError } from 'axios'
import moment from 'moment'

import { apiInstance } from 'apis/index'
import { getUserData } from 'utils/index'
import { IRequestByDate, ISearchQuery, ExpenseData } from 'types/index'

// 차트 주간 조회
export const getWeeklyData = async (params: IRequestByDate) => {
  try {
    const response = await apiInstance.get('/expenses/calendar', { params })
    return response.data
  } catch (error) {
    return error as AxiosError
  }
}

// 주별 소비 조회
export const getWeeklySummary = async () => {
  try {
    const params = {
      period: 'weekly',
      userId: getUserData()?.email ?? ''
    }
    const response = await apiInstance.get('/expenses/summary', { params })
    return response.data
  } catch (error) {
    return error as AxiosError
  }
}

// 검색
export const searchByDateCategory = async (searchQuery: ISearchQuery) => {
  try {
    const requests = searchQuery.categories.map(category => {
      const params = {
        q: category,
        userId: getUserData()?.email ?? ''
      }
      return apiInstance.get('/expenses/search', { params })
    })
    const response = await axios.all(requests).then(
      axios.spread((...response) => {
        const allResult = [] as ExpenseData[]

        response.map(res => allResult.push(...(res.data as ExpenseData[])))

        // 날짜 필터링
        return allResult.filter(data => {
          if (searchQuery.startDate !== '') {
            return (
              moment(data.date) >= moment(searchQuery.startDate) &&
              moment(data.date) <= moment(searchQuery.endDate)
            )
          } else {
            console.log(moment(data.date).date(), moment(searchQuery.endDate).date())
            return moment(data.date).date() <= moment(searchQuery.endDate).date()
          }
        })
      })
    )
    return response
  } catch (error) {
    return error as AxiosError
  }
}

// 월간, 주간, 일간 소비량 호출 함수
export const fetchExpense = async (period: string, userId: string) => {
  try {
    const response = await apiInstance.get('/expenses/summary', {
      params: { period, userId }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// 달력 호출 함수
export const fetchCalendar = async (year: Number, month: Number, userId: string) => {
  try {
    const response = await apiInstance.get('/expenses/calendar', {
      params: { year, month, userId }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// 지출 정보 업데이트 함수
export const updateExpense = async (expenseData: ExpenseData, expenseId: string) => {
  try {
    const response = await apiInstance.put(`/expenses/${expenseId}`, expenseData)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

// 지출 정보 삭제 함수
export const deleteExpense = async (expenseId: string) => {
  try {
    const response = await apiInstance.delete(`/expenses/${expenseId}`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}
