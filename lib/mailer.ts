import { Prisma, User } from '.prisma/client'
import nodemailer, { SentMessageInfo } from 'nodemailer'
import { Mailer } from 'nodemailer-react'

import EmailCreateInput = Prisma.EmailCreateInput;
import AuthEmail from '../components/emails/AuthEmail'
import env from './env'

type SendEmailResult = {
  info: SentMessageInfo,
  data: EmailCreateInput
}

const transport = nodemailer.createTransport({
  host: env.MAIL_TRANSPORT_HOST,
  port: env.MAIL_TRANSPORT_PORT,
  auth: {
    user: env.MAIL_TRANSPORT_AUTH_USER,
    pass: env.MAIL_TRANSPORT_AUTH_PASSWORD
  }
})

const defaults = {
  from: env.MAIL_TRANSPORT_DEFAULT_FROM,
}

export const mailer = Mailer(
  { transport, defaults },
  {
    AuthEmail
  }
)

export const sendAuthEmail = (to: User): Promise<SendEmailResult> => {
  return new Promise((resolve, reject) => {
    mailer.send('AuthEmail', {}, { to: to.email })
      .then((info) => {
        resolve({
          info,
          data: {
            from: env.MAIL_TRANSPORT_DEFAULT_FROM,
            subject: 'Login to your account',
            body: 'Lorem ipsum',
            toUser: {
              connect: {
                id: to.id
              }
            }
          }
        })
      })
      .catch((e) => {
        reject(e)
      })
  })
}
