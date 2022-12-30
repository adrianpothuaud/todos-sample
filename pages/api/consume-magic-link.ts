import { add, isAfter } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

import { decodeAuthToken } from '../../lib/authentication'
import { prisma } from '../../lib/prisma'
import { getSessionByAuthData } from '../../lib/sessions'

type ConsumeMagicLinkResult = {
  ok: boolean
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConsumeMagicLinkResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'post') {
    if (req.body.token !== undefined) {
      const {
        secret,
        sessionId,
        userId
      } = decodeAuthToken(req.body.token)
      // verify user exists
      const targetUser = await prisma.user.findUnique({
        where: { id: userId }
      })
      if (targetUser !== null) {
        // verify session exists and secret is valid
        const targetSession = await getSessionByAuthData(
          sessionId,
          userId,
          secret
        )
        if (targetSession !== null) {
          // verify session is not expired
          if (isAfter(targetSession.expiresAt, add(new Date(), { hours: 1 }))) {
            res.status(200).json({ ok: true })
          }
          else {
            res.status(401).json({ ok: false, error: 'session expired' })
          }
        }
        else {
          res.status(400).json({ ok: false, error: 'sorry' })
        }
      }
      else {
        res.status(400).json({ ok: false, error: 'sorry' })
      }
    }
    else {
      res.status(400).json({ ok: false, error: 'token is required' })
    }
  }
  else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
