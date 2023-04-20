import { Menu } from 'blog'

export const getMenu = (locale: string): Menu => {
  return {
    id: 'ferramentas-de-negocios',
    pages: [
      {
        name: locale === 'pt' ? 'Planilhas inteligentes' : 'Smart spreadsheets',
        id: ''
      }
    ]
  }
}
