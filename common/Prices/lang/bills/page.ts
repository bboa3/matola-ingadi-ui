const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Select the event date from the calendar below.',
      total: 'Total:',
      form: {
        guestsNumber: 'Number of your guests',
        eventType: 'Select event type',
        title: 'Payment information',
        name: 'Your name',
        email: 'Email',
        phoneNumber: 'Phone number',
        cityOrDistrict: 'City or District',
        provinceOrState: 'Province/state',
        country: 'Country',
        submitButton: 'Next Step'
      }
    },
    {
      locale: 'pt',
      h1: 'Selecione a data do evento no calendário abaixo.',
      total: 'Total:',
      form: {
        guestsNumber: 'Número dos seus convidados',
        eventType: 'Selecione o typo de evento',
        title: 'Informação de pagamento',
        name: 'Seu nome',
        email: 'email',
        phoneNumber: 'Número de telefone',
        cityOrDistrict: 'Cidade ou Distrito',
        provinceOrState: 'Província/estado',
        country: 'País',
        submitButton: 'Próximo passo'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
