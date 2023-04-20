const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Thank you for your download',
      description: {
        text1: 'Make good use of the',
        text2: 'worksheet. If you want help, send a message to our WhatsApp, and we will be ready to help you at +258 87 444 4689.'
      },
      downloadMoreButton: 'Download More'
    },
    {
      locale: 'pt',
      h1: 'Obrigado pelo seu download',
      description: {
        text1: 'Faça bom uso da planilha',
        text2: 'Caso queira uma ajuda, envie uma mensagem para o nosso WhatsApp, e estaremos prontos para o ajudar através do +258 87 444 4689.'
      },
      downloadMoreButton: 'Baixar Mais'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
