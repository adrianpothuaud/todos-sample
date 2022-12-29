import { User } from '@prisma/client'

import { prisma } from './prisma'

export const findUserByEmail = (email: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      email
    }
  })
}
