import { NextApiRequest, NextApiResponse } from 'next'
import { getCategoryByUserIdTransaction } from '@/transections/getCategory'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const categories = await getCategoryByUserId(req)
    return res.status(200).json(categories)
  }
}

async function getCategoryByUserId(req: NextApiRequest) {
  const userId = req.query.userId
  if (!userId || typeof userId === 'object') return []
  return await getCategoryByUserIdTransaction(userId)
}
