import nodemailer from 'nodemailer'
import { Mailer } from 'nodemailer-react'

import AuthEmail from '../components/emails/AuthEmail'
import env from './env'

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

export const sendAuthEmail = (to: string) => {
  mailer.send('AuthEmail', {}, { to })
    .then(() => {

    })
}
