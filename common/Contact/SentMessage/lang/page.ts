
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: {
        text1: 'Serving',
        text2: 'You',
        text3: 'and',
        text4: 'your business'
      },
      h2: {
        text1: 'Thank you for contacting us',
        text2: ''
      },
      homepage: 'Home page',
      description: 'Our customer service team will contact you within 24 hours using the contacts provided.'
    },
    {
      locale: 'pt',
      h1: {
        text1: 'Servindo',
        text2: 'Você',
        text3: 'e',
        text4: 'seus Negócios'
      },
      h2: {
        text1: 'Obrigado por entrar em contato conosco',
        text2: ''
      },
      homepage: 'Pagina inicial',
      description: 'A nossa equipe de atendimento entrará em contacto dentro de 24 horas, pelos contacto fornecidos.'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
