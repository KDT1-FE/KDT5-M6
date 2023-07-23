import { NextApiRequest, NextApiResponse } from 'next'
import { getAllExpensesByDateTransaction } from '@/transections/getAllExpenses'
import type { ExpensePeriod } from '@/types/api'

export type ExpenseSummaryRequest = {
  userId: string
  date: ExpensePeriod
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const expenseSummary = await searchAllExpensesByDate(req)
    return res.status(200).json(expenseSummary)
  }
}

async function searchAllExpensesByDate(req: NextApiRequest) {
  const userId = req.query.userId
  const period = req.query.period as ExpensePeriod

  if (userId === undefined || typeof userId === 'object') {
    return new Response('Bad Request ', { status: 400 })
  }
  if (period !== 'daily' && period !== 'weekly' && period !== 'monthly') {
    return new Response('Bad Request ', { status: 400 })
  }

  return await getAllExpensesByDateTransaction(userId, period)
}
