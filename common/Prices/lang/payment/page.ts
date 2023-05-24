
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
      transactionTerms: 'This amount is non-refundable.',
      form: {
        paymentMethod: 'Select your payment method',
        paymentMethodSelected: 'is currently selected as your payment method',
        submitButton: 'Next Step'
      },
      commission: 'Payment gateway fee',
      header: { col1: 'Description', col2: 'Amount' },
      dueAt: 'Due'
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
      transactionTerms: 'Este valor não é reembolsável',
      form: {
        paymentMethod: 'Selecione a sua forma de Pagamento',
        paymentMethodSelected: 'está atualmente selecionado como seu método de pagamento',
        submitButton: 'Próximo passo'
      },
      commission: 'Taxa gateway de pagamento',
      header: { col1: 'Descrição', col2: 'Montante' },
      dueAt: 'Vencimento'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
