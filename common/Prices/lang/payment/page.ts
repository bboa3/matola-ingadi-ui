
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: {
        reservation: {
          text1: 'To hold the date of your event',
          text2: 'you must transfer the amount below before'
        },
        remaining: {
          text1: 'Please send the payment below 15 days before your event'
        }
      },
      transactionTerms: 'This amount is non-refundable.'
    },
    {
      locale: 'pt',
      h1: {
        reservation: {
          text1: 'Para segurar a data do seu evento',
          text2: 'você deve transferir o valor abaixo antes de'
        },
        remaining: {
          text1: 'Por favor, envie o pagamento abaixo 15 dias antes do seu evento'
        }
      },
      transactionTerms: 'Este valor não é reembolsável'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
