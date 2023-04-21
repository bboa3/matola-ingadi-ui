const langOptions = [
  {
    locale: 'en',
    standard: {
      id: '640449efee0b8dcbd7098b44',
      description: ''
    },
    premium: {
      id: '63f496d3271f942aec9612c5',
      description: ''
    }
  },
  {
    locale: 'pt',
    standard: {
      id: '640449efee0b8dcbd7098b44',
      description: ''
    },
    premium: {
      id: '63f496d3271f942aec9612c5',
      description: ''
    }
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
