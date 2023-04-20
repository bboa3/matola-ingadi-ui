export const langOptions = [
  {
    locale: 'en',
    more: 'More indicators'
  },
  {
    locale: 'pt',
    more: 'Mais indicadores'
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
