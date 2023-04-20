export const langOptions = [
  {
    locale: 'en',
    profileView: 'Your Profile',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    contactButton: 'Contact Sales',
    menu: [
      {
        pathname: '/',
        title: 'Matola Ingadi'
      },
      {
        pathname: '/galeria',
        title: 'Gallery'
      },
      {
        pathname: '/blog',
        title: 'Blog'
      }
    ]
  },
  {
    locale: 'pt',
    profileView: 'Perfil',
    signIn: 'Entrar',
    signOut: 'sair',
    contactButton: 'Fale conosco',
    menu: [
      {
        pathname: '/',
        title: 'Matola Ingadi'
      },
      {
        pathname: '/galeria',
        title: 'Galeria'
      },
      {
        pathname: '/blog',
        title: 'Blog'
      }
    ]
  }
]

const getLanguage = (locale: string) => {
  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
