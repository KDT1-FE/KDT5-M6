import type { ExpensePeriod, SanityExpenseResponse } from '@/types/api'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { YOLO_USER_EXPENSES_DOC_TYPE } from '@/constants/constants'
import client from '@/service/sanity'

dayjs.extend(weekOfYear)

export async function getAllExpensesByCategoryTransaction(category: string, userId: string) {
  try {
    // todo : category 조건부 필터를 쿼리에 추가하기
    // prettier-ignore
    const query = `*[_type == "${YOLO_USER_EXPENSES_DOC_TYPE}" ${userId ? `&& user._ref == "${userId}"` : ''} ${category ? `&& category == "${category}"` : ''}]{
      "id" : _id,
      "userId" : user._ref,
      "date" : date,
      "amount" : amount,
      "category" : category
    }`
    return await client.fetch(query)

    // * TEST CODE
    // return expenses.map((expense: SanityExpenseResponse) => {
    //   return {
    //     id: expense._id,
    //     userId: expense.user._ref,
    //     date: expense.date,
    //     amount: expense.amount,
    //     category: expense.category
    //   }
    // })
    // ! already filtered by category in query
    // .filter((expense: Expense) => {
    //   if (!category) return expense
    //   return expense.category === category
    // })
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getAllExpensesByDateTransaction(userId: string, date: ExpensePeriod) {
  try {
    const query = `*[_type == "${YOLO_USER_EXPENSES_DOC_TYPE}"&& user._ref == "${userId}"]
    {
      date,
      amount
    }`

    const response: SanityExpenseResponse[] = await client.fetch(query)
    let request = getDailyExpenses
    if (date === 'weekly') request = getWeeklyExpenses
    if (date === 'monthly') request = getMonthlyExpenses

    return request(response)
  } catch (error) {
    console.error(error)
    return {}
  }
}

type Accumulator = {
  [key: string]: number
}
type ExpenseSummaryResponse = Pick<SanityExpenseResponse, 'amount' | 'date'>
function getDailyExpenses(expenses: ExpenseSummaryResponse[]) {
  const obj: Accumulator = {}
  expenses.forEach((expense) => {
    obj[expense.date] ? (obj[expense.date] += expense.amount) : (obj[expense.date] = expense.amount)
  })
  return Object.entries(obj).map((v) => {
    return {
      _id: v[0],
      totalAmount: v[1]
    }
  })
}

function getWeeklyExpenses(expenses: ExpenseSummaryResponse[]) {
  const obj: Accumulator = {}
  expenses.forEach((expense) => {
    const date = dayjs(expense.date).format('YYYY') + '-' + dayjs(expense.date).week()
    obj[date] ? (obj[date] += expense.amount) : (obj[date] = expense.amount)
  })
  return Object.entries(obj).map((v) => {
    return {
      _id: v[0],
      totalAmount: v[1]
    }
  })
}

function getMonthlyExpenses(expenses: ExpenseSummaryResponse[]) {
  const obj: Accumulator = {}
  expenses.forEach((expense) => {
    const date = dayjs(expense.date).format('YYYY-MM')
    obj[date] ? (obj[date] += expense.amount) : (obj[date] = expense.amount)
  })
  return Object.entries(obj).map((v) => {
    return {
      _id: v[0],
      totalAmount: v[1]
    }
  })
}
