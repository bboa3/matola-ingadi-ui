import getPricing from 'common/Prices/lang/pricing'

const getLanguage = (locale: string) => {
  const pricing = getPricing(locale)

  const langOptions = [
    {
      locale: 'en',
      informationPricing: {
        title: {
          h1: 'Economic and Financial Information for Business and Investment in Mozambique',
          p2: 'Select the best plan for you'
        }
      },
      consultancyTemplates: {
        title: {
          h1: 'Excel and Docs Templates',
          p2: 'Select the best plan for you'
        }
      },
      startButton: 'Start',
      save: '/Year and save',
      per: '/Month',
      popular: 'Popular',
      pricing,
      contact: {
        title: 'Contact Sales'
      }
    },
    {
      locale: 'pt',
      informationPricing: {
        title: {
          h1: 'Informação Económica e Financeira para Negócios e Investimentos em Moçambique',
          p2: 'Selecione o melhor plano para você'
        }
      },
      consultancyTemplates: {
        title: {
          h1: 'Modelos de Excel e Docs',
          p2: 'Select the best plan for you'
        }
      },
      startButton: 'Começar',
      save: '/Ano e poupa',
      per: '/Mês',
      popular: 'Popular',
      pricing,
      contact: {
        title: 'Contact Sales'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
