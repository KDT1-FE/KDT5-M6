import { baseInstance } from 'api/index'

export const DeleteExpenseList = async (_id: string): Promise<boolean> => {
  try {
    await baseInstance.delete(`/expenses/${_id}`)
    return true
  } catch (error) {
    console.warn(error)
    console.warn('삭제 실패')
    return false
  }
}
