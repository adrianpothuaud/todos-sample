import axios from 'axios'

import env from './env'

type MailtrapMessage = {
  'id': number
  'inbox_id': number
  'subject': string
  'sent_at': string
  'from_email': string
  'from_name': string
  'to_email': string
  'to_name': string
  'email_size': number
  'is_read': boolean
  'created_at': string
  'updated_at': string
  'html_body_size': number
  'text_body_size': number
  'human_size': string
  'html_path': string
  'txt_path': string
  'raw_path': string
  'download_path': string
  'html_source_path': string
  'blacklists_report_info': Object,
  'smtp_information': Object
}

export const listMessagesInMailtrapSandbox = (): Promise<MailtrapMessage[]> => {
  return new Promise((resolve, reject) => {
    const config = {
      method: 'get',
      url: `https://mailtrap.io/api/accounts/${env.MAILTRAP_ACCOUNT_ID}/inboxes/${env.MAILTRAP_INBOX_ID}/messages`,
      headers: {
        'Api-Token': env.MAILTRAP_API_TOKEN,
        'Content-Type': 'application/json'
      }
    }

    axios(config)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  })
}
