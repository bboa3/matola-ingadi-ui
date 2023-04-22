import { getPopularPages } from '@common/NotFound/popular'

const getLanguage = (locale: string) => {
  const popularPages = getPopularPages(locale!)

  const langOptions = [
    {
      locale: 'en',
      slogan: 'The future is attitude!',
      terms: {
        text: 'all rights reserved.',
        page: {
          title: 'Terms and Conditions',
          href: '/termos-e-condicoes'
        }
      },
      menu: [
        {
          name: 'Popular Pages',
          pages: popularPages.map(({ title, href }) => ({ title, href, local: true }))
        },
        {
          name: 'Solutions',
          pages: [
            {
              title: 'Booking',
              href: '/precos',
              local: true
            },
            {
              title: 'Blog',
              href: '/blog',
              local: true
            }
          ]
        },
        {
          name: 'Company',
          pages: [
            {
              title: 'About Us',
              href: '/sobre-nos',
              local: true
            },
            {
              title: 'Visit Us',
              href: '/sobre-nos',
              local: true
            },
            {
              title: 'Talk to us',
              href: '/contacto',
              local: true
            }
          ]
        }
      ]
    },
    {
      locale: 'pt',
      slogan: 'O futuro é atitude!',
      terms: {
        text: 'todos direitos reservados.',
        page: {
          title: 'Termos e Condiçõe',
          href: '/termos-e-condicoes'
        }
      },
      menu: [
        {
          name: 'Páginas Populares',
          pages: popularPages.map(({ title, href }) => ({ title, href, local: true }))
        },
        {
          name: 'Soluções',
          pages: [
            {
              title: 'Reserva',
              href: '/precos',
              local: true
            },
            {
              title: 'Blog',
              href: '/blog',
              local: true
            }
          ]
        },
        {
          name: 'Company',
          pages: [
            {
              title: 'Sobre nós',
              href: '/sobre-nos',
              local: true
            },
            {
              title: 'Visite Matola Ingadi',
              href: '/sobre-nos',
              local: true
            },
            {
              title: 'Fale connosco',
              href: '/contacto',
              local: true
            }
          ]
        }
      ]
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
