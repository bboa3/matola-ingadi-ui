import { templete } from '@lib/mail/templetes/html/send-verification-request'
import handlebars from 'handlebars'

export interface TempletePros {
  url: string
  host: string
}

const mailTemplateParse = handlebars.compile(templete)

export const createHtml = (data: TempletePros) => {
  const html = mailTemplateParse(data)

  return html
}

export const createText = ({ host, url }: TempletePros) => {
  return `Sign in to ${host}\n${url}\n\n`
}
