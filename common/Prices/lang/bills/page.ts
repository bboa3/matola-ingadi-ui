const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: {
        text1: 'Best Information Services for Business and Investment in Mozambique',
        text2: ''
      },
      total: 'Total:',
      form: {
        maxTeamMembers: 'Number of you team members',
        billPeriods: {
          month: 'Monthly',
          year: 'Yearly'
        },
        save: 'save',
        title: 'Payment information',
        name: 'Your name or company',
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
      h1: {
        text1: 'Melhores Serviços de Informação Para Negócios e Investimentos',
        text2: 'em Moçambique'
      },
      total: 'Total:',
      form: {
        maxTeamMembers: 'Usuários da sua equipe',
        billPeriods: {
          month: 'Mensal',
          year: 'Anual'
        },
        save: 'poupa',
        title: 'Informação de pagamento',
        name: 'Seu nome ou empresa',
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
