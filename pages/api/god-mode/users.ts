import { User } from '.prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import env from '../../../lib/env'
import { prisma } from '../../../lib/prisma'

type UserListResult = {
  ok: boolean
  error?: string
  users?: User[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserListResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'get') {
    if (req.headers[env.GOD_MODE_HEADER.toLowerCase()] !== undefined && req.headers[env.GOD_MODE_HEADER.toLowerCase()] === env.GOD_MODE_API_KEY) {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      res.status(200).json({
        ok: true,
        users
      })
    } else {
      res.status(403).json({ ok: false, error: 'only god' })
    }
  } else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
