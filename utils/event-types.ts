
const langOptions = [
  {
    locale: 'en',
    services: [
      {
        id: 'casamento',
        name: 'Wedding Party'
      },
      {
        id: 'boda',
        name: 'Boda'
      },
      {
        id: 'aniversario',
        name: 'Birthday Party'
      },
      {
        id: 'graduacao',
        name: 'Graduation Party'
      },
      {
        id: 'evento-empresarial',
        name: 'Business Event'
      },
      {
        id: 'evento-corporativo',
        name: 'Corporate event'
      },
      {
        id: 'evento-cultural',
        name: 'Cultural Event'
      },
      {
        id: 'festa-religiosa',
        name: 'Religious Festival'
      },
      {
        id: 'outros',
        name: 'Others Party'
      }
    ]
  },
  {
    locale: 'pt',
    services: [
      {
        id: 'casamento',
        name: 'Festa de Casamento'
      },
      {
        id: 'boda',
        name: 'Boda'
      },
      {
        id: 'aniversario',
        name: 'Festa de Aniversário'
      },
      {
        id: 'graduacao',
        name: 'Festa de Graduação'
      },
      {
        id: 'evento-empresarial',
        name: 'Evento Empresarial'
      },
      {
        id: 'evento-corporativo',
        name: 'Evento Corporativo'
      },
      {
        id: 'evento-cultural',
        name: 'Evento Cultural'
      },
      {
        id: 'festa-religiosa',
        name: 'Festa Religiosa'
      },
      {
        id: 'outros',
        name: 'Outras Festas'
      }
    ]
  }
]

const getEventTypes = (locale: string) => {
  const eventTypes = langOptions.find((page) => page.locale === locale)!.services

  return eventTypes
}

export default getEventTypes
