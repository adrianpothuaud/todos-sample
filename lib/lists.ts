import { User } from '@prisma/client'

import { prisma } from './prisma'

export const findUserLists = async (user: User) => {
  return prisma.todoList.findMany({
    where: {
      ownerId: user.id
    }
  })
}
