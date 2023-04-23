import { iconFile } from '@lib/mail/icon'
import { logoFile } from '@lib/mail/logo'
import { createHtml, createText } from '@lib/mail/templetes/send-verification-request'
import { SendVerificationRequestParams } from 'next-auth/providers'
import nodemailer from 'nodemailer'

export async function sendVerificationRequest (params: SendVerificationRequestParams) {
  const { identifier: email, url, provider: { server, from } } = params
  const { host } = new URL(url)

  const transport = nodemailer.createTransport(server)
  const logo = Buffer.from(logoFile.data)
  const icon = Buffer.from(iconFile.data)

  const result = await transport.sendMail({
    to: email,
    from: `"Matola Ingadi" <${from}>`,
    subject: `Sign in to ${host}`,
    text: createText({ url, host }),
    html: createHtml({ url, host }),
    attachments: [
      {
        filename: 'matola-ingadi-logo.png',
        content: logo,
        cid: 'logo@matolaingadi.co.mz'
      },
      {
        filename: 'matolaingadi-icon.png',
        content: icon,
        cid: 'icon@matolaingadi.co.mz'
      }
    ]
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
