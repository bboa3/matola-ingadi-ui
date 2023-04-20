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
              title: 'Pricing',
              href: '/precos',
              local: true
            },
            {
              title: 'Resources',
              href: '/recursos',
              local: true
            },
            {
              title: 'Blog',
              href: '/blog',
              local: true
            },
            {
              title: 'API access',
              href: 'https://mozeconomia.docs.apiary.io/',
              local: false
            },
            {
              title: 'Documentation',
              href: '/',
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
            // {
            //   title: 'Partners',
            //   href: '/parceiros',
            //   local: true
            // },
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
              title: 'Preços',
              href: '/precos',
              local: true
            },
            {
              title: 'Recursos',
              href: '/recursos',
              local: true
            },
            {
              title: 'Blog',
              href: '/blog',
              local: true
            },
            {
              title: 'Acesso à API',
              href: 'https://mozeconomia.docs.apiary.io/',
              local: false
            },
            {
              title: 'Documentação',
              href: '/',
              local: true
            }
          ]
        },
        {
          name: 'Empresa',
          pages: [
            {
              title: 'Sobre nós',
              href: '/sobre-nos',
              local: true
            },
            // {
            //   title: 'Parceiros',
            //   href: '/parceiros',
            //   local: true
            // },
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
