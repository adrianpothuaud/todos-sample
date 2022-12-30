import jsonwebtoken from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

import env from '../../../lib/env'

type GenerateJWTResult = {
  ok: boolean
  error?: string
  token?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateJWTResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'post') {
    if (req.headers[env.GOD_MODE_HEADER.toLowerCase()] !== undefined && req.headers[env.GOD_MODE_HEADER.toLowerCase()] === env.GOD_MODE_API_KEY) {
      if (req.body.userId !== undefined) {
        if (req.body.sessionId !== undefined) {
          if (req.body.secret !== undefined) {
            const token = jsonwebtoken.sign({
              secret: req.body.secret,
              sessionId: req.body.sessionId,
              userId: req.body.userId
            }, env.JWT_SECRET)
            res.status(200).json({
              ok: true,
              token
            })
          } else {
            res.status(400).json({ ok: false, error: 'secret required' })
          }
        } else {
          res.status(400).json({ ok: false, error: 'sessionId required' })
        }
      } else {
        res.status(400).json({ ok: false, error: 'userId required' })
      }
    } else {
      res.status(403).json({ ok: false, error: 'only god' })
    }
  } else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
