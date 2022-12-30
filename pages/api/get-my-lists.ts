import { TodoList } from '@prisma/client'
import { add, isAfter } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

import { findUserLists } from 'lib/lists'

import { decodeAuthToken } from '../../lib/authentication'
import { prisma } from '../../lib/prisma'
import { getSessionByAuthData } from '../../lib/sessions'

type GetMyListsResult = {
  ok: boolean
  error?: string
  lists?: TodoList[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetMyListsResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'get') {
    if (req.headers['authorization'] !== undefined) {
      const token = req.headers['authorization'].split(' ')[1]
      const {
        secret,
        sessionId,
        userId
      } = decodeAuthToken(token)
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
            const myLists = await findUserLists(targetUser)
            res.status(200).json({ ok: true, lists: myLists })
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
      res.status(401).json({ ok: false, error: 'authorization is required' })
    }
  }
  else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
