import { NextApiRequest, NextApiResponse } from 'next'
import { getUserByEamilTransaction } from '@/transections/getUserInfo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userInfo = await getUserByEamil(req)
    return res.status(200).json(userInfo)
  }
}

async function getUserByEamil(req: NextApiRequest) {
  const email = req.query.email as string
  return await getUserByEamilTransaction(email)
}
