import { Session } from '.prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

import env from '../../../lib/env'
import { prisma } from '../../../lib/prisma'

type SessionListResult = {
  ok: boolean
  error?: string
  sessions?: Session[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionListResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'get') {
    if (req.headers[env.GOD_MODE_HEADER.toLowerCase()] !== undefined && req.headers[env.GOD_MODE_HEADER.toLowerCase()] === env.GOD_MODE_API_KEY) {
      if (req.query.userId !== undefined) {
        const sessions = await prisma.session.findMany({
          where: {
            userId: req.query.userId as string
          }
        })
        res.status(200).json({
          ok: true,
          sessions
        })
      } else {
        const sessions = await prisma.session.findMany()
        res.status(200).json({
          ok: true,
          sessions
        })
      }
    } else {
      res.status(403).json({ ok: false, error: 'only god' })
    }
  } else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
