import { getPopularPages } from 'common/NotFound/popular'

export const getLanguage = (locale: string) => {
  const popularPages = getPopularPages(locale!)

  const langOptions = [
    {
      locale: 'en',
      h1: 'This page does not exist',
      description: 'The page you are looking for was not found.',
      menu: {
        name: 'Popular Pages',
        pages: popularPages.map(({ title, description, Icon, href }) => ({ title, description, Icon, href }))
      },
      homePage: {
        title: 'Home Pages',
        href: '/'
      }
    },
    {
      locale: 'pt',
      h1: 'Esta página não existe',
      description: 'A página que procura não foi encontrada',
      menu: {
        name: 'Páginas Populares',
        pages: popularPages.map(({ title, description, Icon, href }) => ({ title, description, Icon, href }))
      },
      homePage: {
        title: 'Páginas Inicial',
        href: '/'
      }
    }
  ]
  return langOptions.find((page) => page.locale === locale)!
}
