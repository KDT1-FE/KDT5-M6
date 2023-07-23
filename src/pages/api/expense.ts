import { NextApiRequest, NextApiResponse } from 'next'

import { addExpeneseTransaction } from '@/transections/addExpense'
import type { ExpenseRequestBody } from '@/types/api'

export type EditExpenseByIdRequestBody = {
  category?: string
  date?: string
  amount?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const responseMessage = await addExpense(req)
    if (responseMessage.code) return res.status(400).send(responseMessage)
    return res.status(201).send(responseMessage)
  }
}

async function addExpense(req: NextApiRequest) {
  const expenseRequestBody: ExpenseRequestBody = req.body
  return await addExpeneseTransaction(expenseRequestBody)
}
