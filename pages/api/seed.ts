// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import {add} from 'date-fns'

import env from '../../lib/env'
import {prisma} from '../../lib/prisma'
import {getRandomEmailBasedOn} from '../../lib/randoms'

type SeedResult = {
  ok: boolean
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SeedResult>
) {
  if (env.NODE_ENV !== 'production' && req.method !== undefined && req.method.toLowerCase() === 'post') {
    // --- delete everything
    await prisma.todoItem.deleteMany()
    await prisma.todoList.deleteMany()
    await prisma.user.deleteMany()
    // --- create users
    const user1 = await prisma.user.create({
      data: {
        email: getRandomEmailBasedOn('titi@todos.io')
      }
    })
    const user2 = await prisma.user.create({
      data: {
        email: getRandomEmailBasedOn('tata@todos.io')
      }
    })
    const user3 = await prisma.user.create({
      data: {
        email: getRandomEmailBasedOn('toto@todos.io')
      }
    })
    // --- create user sessions
    const user1Session = await prisma.session.create({
      data: {
        expiresAt: add(new Date(), {days: 2}),
        secret: crypto.randomBytes(16).toString('hex'),
        userId: user1.id
      }
    })
    const user2Session = await prisma.session.create({
      data: {
        expiresAt: add(new Date(), {days: 2}),
        secret: crypto.randomBytes(16).toString('hex'),
        userId: user2.id
      }
    })
    // --- create todo lists
    const todoList1 = await prisma.todoList.create({
      data: {
        ownerId: user1.id,
        title: 'List #1',
        description: 'Lorem ipsum ...',
        items: {
          create: [
            {
              title: 'Item #1',
              description: 'Lorem ipsum dolor sit amet ...'
            },
            {
              title: 'Item #2',
              description: 'Lorem ipsum dolor sit amet ...'
            },
            {
              title: 'Item #3',
              description: 'Lorem ipsum dolor sit amet ...'
            }
          ]
        }
      }
    })
    const todoList2 = await prisma.todoList.create({
      data: {
        ownerId: user1.id,
        title: 'List #2',
        description: 'Lorem ipsum ...',
        guests: {
          connect: [
            { id: user2.id },
            { id: user3.id },
          ]
        },
        items: {
          create: [
            {
              title: 'Item #4',
              description: 'Lorem ipsum dolor sit amet ...'
            },
            {
              title: 'Item #5',
              description: 'Lorem ipsum dolor sit amet ...'
            },
            {
              title: 'Item #6',
              description: 'Lorem ipsum dolor sit amet ...'
            }
          ]
        }
      }
    })
    res.status(200).json({ok: true})
  } else {
    res.status(403).json({ok: false, error: 'not allowed'})
  }
}
