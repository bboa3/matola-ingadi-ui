import { Menu } from 'blog'

export const getMenu = (locale: string): Menu => {
  return {
    id: 'blog',
    pages: [
      {
        name: locale === 'pt' ? 'Economia' : 'Economy',
        id: 'economia'
      },
      {
        name: locale === 'pt' ? 'Negócio' : 'Business',
        id: 'negocio'
      },
      {
        name: locale === 'pt' ? 'Finanças e contabilidade' : 'Finance & Accounting',
        id: 'financas-e-contabilidade'
      }
    ]
  }
}
