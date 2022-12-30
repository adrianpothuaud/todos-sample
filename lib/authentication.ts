import { Session, User } from '@prisma/client'
import jsonwebtoken from 'jsonwebtoken'

import env from './env'

type AuthTokenData = {
  iat: number
  secret: string
  sessionId: string
  userId: string
}

export const createAuthToken = async (user: User, session: Session) => {
  return jsonwebtoken.sign({
    secret: session.secret,
    sessionId: session.id,
    userId: user.id
  }, env.JWT_SECRET)
}

export const createMagicLink = (token: string) => `${env.BASE_URL}/magic-link-auth?t=${token}`

export const decodeAuthToken = (token: string): AuthTokenData => {
  jsonwebtoken.verify(token, env.JWT_SECRET)
  const tokenData = jsonwebtoken.decode(token)
  return tokenData as AuthTokenData
}
