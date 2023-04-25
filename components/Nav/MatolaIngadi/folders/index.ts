import { Menu } from 'ui'

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
        name: locale === 'pt' ? 'Galeria' : 'Gallery',
        id: 'galeria'
      },
      {
        name: locale === 'pt' ? 'Blog' : 'Blog',
        id: 'blog'
      },
      {
        name: locale === 'pt' ? 'Sobre nós' : 'About us',
        id: 'sobre-nos'
      }
    ]
  }
}
