import crypto from 'crypto'

import { User } from '@prisma/client'
import { add } from 'date-fns'

import { prisma } from './prisma'

export const createUserSession = async (user: User, requestIP: string) => {
  const newSessionSecret = crypto.randomBytes(16).toString('hex')
  return prisma.session.create({
    data: {
      expiresAt: add(new Date(), { days: 1 }),
      secret: newSessionSecret,
      userId: user.id,
      userIP: requestIP === '::1' ? '127.0.0.1' : requestIP
    }
  })
}

export const getSessionByAuthData = async (sessionId: string, userId: string, secret: string) => {
  const targetSessions = await prisma.session.findMany({
    where: {
      id: sessionId,
      user: {
        is: {
          id: userId
        }
      },
      secret
    }
  })
  if (targetSessions.length === 0) return null
  else return targetSessions[0]
}
