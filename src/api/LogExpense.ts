import { baseInstance } from 'api/index'

export const logExpense = async (
  amount: number,
  userId: string,
  category: string,
  date: string
) => {
  try {
    const res = await baseInstance({
      method: 'POST',
      data: {
        amount: amount,
        userId: userId,
        category: category,
        date: date
      }
    })
    return res.data
  } catch (error) {
    console.error(`ERROR:${error}`)
  }
}
