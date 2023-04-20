const langOptions = [
  {
    locale: 'en',
    free: {
      id: '640449efee0b8dcbd7098b44',
      description: 'Perfect for anyone who simply wants to see and analyze indicators'
    },
    standard: {
      id: '63f496d3271f942aec9612c5',
      description: 'Perfect for individuals or business teams that analyze and download indicators'
    },
    professional: {
      id: '63f4955e271f942aec9612bf',
      description: 'Perfect for business that analyze and download indicators and want API access'
    }
  },
  {
    locale: 'pt',
    free: {
      id: '640449efee0b8dcbd7098b44',
      description: 'Perfeito para quem simplesmente quer ver e analisar indicadores'
    },
    standard: {
      id: '63f496d3271f942aec9612c5',
      description: 'Perfeito para indivíduos ou equipes que analisa e baixa indicadores'
    },
    professional: {
      id: '63f4955e271f942aec9612bf',
      description: 'Perfeito para empresa que analisa e baixa indicadores e deseja acesso à API'
    }
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
