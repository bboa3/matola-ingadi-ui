
export const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en'
    },
    {
      locale: 'pt'
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
