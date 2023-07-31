import type { ExpenseRequestBody } from '@/types/api'
import client from '@/service/sanity'
import { YOLO_USER_EXPENSES_DOC_TYPE } from '@/constants/constants'

export async function addExpeneseTransaction({ amount, category, userId, date }: ExpenseRequestBody) {
  try {
    if (!amount || !category || !userId || !date) {
      return {
        message: 'Missing required fields',
        code: 22
      }
    }
    await client.create({
      _type: YOLO_USER_EXPENSES_DOC_TYPE,
      category,
      amount,
      date,
      user: {
        _type: 'reference',
        _ref: userId
      }
    })
    return {
      message: 'Expense added successfully',
      code: 0
    }
  } catch (error) {
    console.error(error)
    return {
      message: 'Something went wrong',
      code: 1
    }
  }
}
