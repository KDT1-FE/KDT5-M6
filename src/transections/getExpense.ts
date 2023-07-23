import type { Expense, ExpenseCalendar } from '@/types/api'
import dayjs from 'dayjs'
import client from '@/service/sanity'
import { YOLO_USER_EXPENSES_DOC_TYPE } from '@/constants/constants'

export async function getExpensesCalendarTransaction(year: string, month: string, userId: string) {
  try {
    const upTo = dayjs(`${year}-${month}-01`).add(1, 'month').format('YYYY-MM-DD')
    const currentDate = dayjs(`${year}-${month}-01`).format('YYYY-MM-DD')
    const query = `*[_type == "${YOLO_USER_EXPENSES_DOC_TYPE}" && user._ref == "${userId}" && date >= "${currentDate}" && date < "${upTo}"]{
      "id" : _id,
      "userId" : user->._id,
      date,
      amount,
      category
    }`
    const expenses: Expense[] = await client.fetch(query)

    const expenseCalendar: ExpenseCalendar = {}

    expenses
      // .filter((expense) => {
      //   return dayjs(expense.date).format('YYYY') === year && Number(dayjs(expense.date).format('MM')) === Number(month)
      // })
      .forEach((expense) => {
        const day = dayjs(expense.date).format('D')
        if (!expenseCalendar[day]) {
          expenseCalendar[day] = [expense]
          return
        }
        expenseCalendar[day].push(expense)
      })
    return expenseCalendar
  } catch (error) {
    console.error(error)
    return {}
  }
}
