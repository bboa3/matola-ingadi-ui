export const langOptions = [
  {
    locale: 'en',
    placeholder: 'Quick search...'
  },
  {
    locale: 'pt',
    placeholder: 'Pesquisa rápida...'
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
