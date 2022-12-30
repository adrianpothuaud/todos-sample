import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../lib/prisma'

type SignUpResult = {
  ok: boolean
  user?: User
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'post') {
    if (req.body.email !== undefined) {
      if (req.body.firstName !== undefined) {
        if (req.body.lastName !== undefined) {
          const newUser = await prisma.user.create({
            data: req.body
          })
          res.status(201).json({
            ok: true,
            user: newUser
          })
        }
        else {
          res.status(400).json({ ok: false, error: 'lastName is required' })
        }
      }
      else {
        res.status(400).json({ ok: false, error: 'firstName is required' })
      }
    }
    else {
      res.status(400).json({ ok: false, error: 'email is required' })
    }
  }
  else {
    res.status(405).json({ ok: false, error: 'method not allowed' })
  }
}
