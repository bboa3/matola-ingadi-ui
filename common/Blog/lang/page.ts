const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      recommended: 'Recommended for you',
      published: 'Published',
      recommendedDescription: 'Get more information and related news.',
      GoBackButton: 'Go Back'
    },
    {
      locale: 'pt',
      recommended: 'Recomendado para você',
      published: 'Publicado',
      recommendedDescription: 'Obtenha mais informações e notícias relacionadas.',
      GoBackButton: 'Voltar'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
