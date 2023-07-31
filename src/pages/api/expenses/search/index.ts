import { NextApiRequest, NextApiResponse } from 'next'
import { getAllExpensesByCategoryTransaction } from '@/transections/getAllExpenses'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const expenses = await getAllExpensesByCategory(req)
    return res.status(200).json(expenses)
  }
}

async function getAllExpensesByCategory(req: NextApiRequest) {
  const category = req.query.q as string
  const userId = req.query.userId
  if (!userId || typeof userId === 'object') return []
  const response = await getAllExpensesByCategoryTransaction(category, userId)
  return response
}
