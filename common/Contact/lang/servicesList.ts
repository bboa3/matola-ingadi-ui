import getConsultancyServices from '@common/Consultancy/lang/services'

const langOptions = [
  {
    locale: 'en',
    services: [
      {
        id: 'informacao-economica-e-financeira',
        name: 'Economic and Financial Information'
      },
      {
        id: 'modelos-de-planilhas-inteligentes',
        name: 'Smart Spreadsheet Templates'
      },
      {
        id: 'blog',
        name: 'Blog'
      }
    ]
  },
  {
    locale: 'pt',
    services: [
      {
        id: 'informacao-economica-e-financeira',
        name: 'Informação Económica e Financeira'
      },
      {
        id: 'modelos-de-planilhas-inteligentes',
        name: 'Modelos de Planilhas Inteligentes'
      },
      {
        id: 'blog',
        name: 'Blog'
      }
    ]
  }
]

const getLanguage = (locale: string) => {
  const consultancyServices = getConsultancyServices(locale).map(({ id, name }) => ({ id, name }))
  const services = langOptions.find((page) => page.locale === locale)!.services

  return [
    ...consultancyServices,
    ...services
  ]
}

export default getLanguage
