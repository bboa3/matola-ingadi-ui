import { Menu } from 'blog'

export const getMenu = (locale: string): Menu => {
  return {
    id: '',
    pages: [
      {
        name: locale === 'pt' ? 'Reservar' : 'Booking',
        id: 'precos'
      },
      {
        name: locale === 'pt' ? 'Visite-nos' : 'Visit us',
        id: 'sobre-nos'
      },
      {
        name: locale === 'pt' ? 'Sobre nós' : 'About us',
        id: 'sobre-nos'
      }
    ]
  }
}
