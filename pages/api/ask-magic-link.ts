import { Email } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'

import { sendAuthEmail } from '../../lib/mailer'
import { prisma } from '../../lib/prisma'
import { createUserSession } from '../../lib/sessions'
import { findUserByEmail } from '../../lib/users'

type AskMagicLinkResult = {
  ok: boolean
  email?: Email
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AskMagicLinkResult>
) {
  if (req.method !== undefined && req.method.toLowerCase() === 'post') {
    if (req.body.email !== undefined) {
      const targetUser = await findUserByEmail(req.body.email)
      if (targetUser !== null) {
        const detectedIp = requestIp.getClientIp(req)
        await createUserSession(targetUser, detectedIp!)
        const { data: emailData } = await sendAuthEmail(targetUser)
        const newEmailInfo = await prisma.email.create({ data: emailData })
        res.status(200).json({
          ok: true,
          email: newEmailInfo
        })
      } else {
        res.status(400).json({ ok: false, error: 'sorry' })
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
