import getPricing from 'common/Prices/lang/pricing'

const getLanguage = (locale: string) => {
  const pricing = getPricing(locale)

  const langOptions = [
    {
      locale: 'en',
      eventHall: {
        title: {
          h1: 'Event Hall for You and Your Guests',
          p2: 'Select the best plan for you'
        }
      },
      startButton: 'Start',
      visitButton: 'Come to Visite',
      save: '/Year and save',
      per: '/Guest',
      popular: 'Popular',
      pricing,
      contact: {
        title: 'Contact Sales'
      }
    },
    {
      locale: 'pt',
      eventHall: {
        title: {
          h1: 'Salão de Eventos para Você e Seus Convidados',
          p2: 'Selecione o melhor plano para você'
        }
      },
      startButton: 'Começar',
      visitButton: 'Venha Visitar-nos',
      save: '/Ano e poupa',
      per: '/Convidado',
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
