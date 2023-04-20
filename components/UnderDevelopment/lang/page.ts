
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Under development',
      description: 'Is this information important to you? Please give us your feedback so that the information is available as soon as possible.',
      feedbackButton: 'Your Feedback',
      initialPageButton: 'Initial Page'
    },
    {
      locale: 'pt',
      h1: 'Ainda em desenvolvimento',
      description: 'Esta informação é importante para você? Por favor, dê-nos o seu feedback para que a informação esteja disponível o mais rápido possível.',
      feedbackButton: 'Dar Feedback',
      initialPageButton: 'Página Inicial'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
