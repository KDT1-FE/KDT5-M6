import client from '@/service/sanity'
import { YOLO_USER_EXPENSES_DOC_TYPE } from '@/constants/constants'
import type { Expense } from '@/types/api'

type ExpensesResponse = {
  item: string
}

export async function getCategoryByUserIdTransaction(userId: string) {
  try {
    const users: ExpensesResponse[] =
      await client.fetch(`*[_type == "${YOLO_USER_EXPENSES_DOC_TYPE}" && user._ref == "${userId}"]
    {
      "item" : category
    }`)
    const categories = new Set<string>()
    users.forEach((expense) => categories.add(expense.item))
    return [...categories]
  } catch (error) {
    console.error(error)
    return []
  }
}
