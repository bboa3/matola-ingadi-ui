import getServices from '@utils/event-types'

const getLanguage = (locale: string) => {
  const services = getServices(locale)
  const langOptions = [
    {
      locale: 'en',
      services,
      form: {
        title: 'Contact us directly',
        name: 'Your name',
        email: 'Your email',
        phoneNumber: 'Phone number',
        service: 'Select event type',
        message: 'Tell us how we can help you',
        submitButton: 'Send'
      }
    },
    {
      locale: 'pt',
      services,
      form: {
        title: 'Entre em contato conosco diretamente',
        name: 'Seu nome',
        email: 'Seu email',
        phoneNumber: 'Número de telefone',
        service: 'Selecione o typo de evento',
        message: 'Diga-nos como podemos ajudá-lo',
        submitButton: 'Enviar'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
