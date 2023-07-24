import { baseInstance } from 'api/axios'

export interface Expenses {
  _id: string
  amount: number
  category: string
  date: string
  userId: string
  __v: number
}

export const fetchExpenses = async (
  keyword: string,
  userId: string
): Promise<Expenses[]> => {
  try {
    const res = await baseInstance({
      method: 'GET',
      url: `/expenses/search?q=${keyword}&userId=${userId}`
    })
    const data: Expenses[] = res.data
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
