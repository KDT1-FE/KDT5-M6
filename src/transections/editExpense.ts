import type { EditExpense } from '@/types/api'
import client from '@/service/sanity'

export async function editExepnseByIdTransaction(id: string, body: EditExpense) {
  try {
    const { userId, id: expenseId, ...restBody } = body
    await client.patch(id).set(restBody).commit()
    return {
      code: 0,
      message: 'Expense updated successfully'
    }
  } catch (error) {
    console.error(error)
    return {
      code: 22,
      message: 'Expense update failed'
    }
  }
}
