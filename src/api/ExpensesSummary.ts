import { baseInstance } from 'api/index'

export const getExpensesSummary = async (
  period: string,
  userId: string
): Promise<ExpenseSummary[]> => {
  try {
    const response = await baseInstance.get(
      `/expenses/summary?period=${period}&userId=${userId}`
    )
    return response.data
  } catch (error) {
    console.warn(error)
    console.warn('조회실패')
    return []
  }
}

export interface ExpenseSummary {
  _id: string
  totalAmount: number
}
