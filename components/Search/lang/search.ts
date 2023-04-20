export const langOptions = [
  {
    locale: 'en',
    placeholder: 'Search here...'
  },
  {
    locale: 'pt',
    placeholder: 'Pesquisa aqui...'
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
