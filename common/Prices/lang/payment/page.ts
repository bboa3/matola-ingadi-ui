
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      form: {
        paymentMethod: 'Select your payment method',
        paymentMethodSelected: 'is currently selected as your payment method',
        submitButton: 'Next Step'
      },
      commission: 'Payment gateway fee',
      header: { col1: 'Description', col2: 'Amount' },
      dueAt: 'Due',
      transactionTerms: 'This amount is non-refundable.'
    },
    {
      locale: 'pt',
      form: {
        paymentMethod: 'Selecione a sua forma de Pagamento',
        paymentMethodSelected: 'está atualmente selecionado como seu método de pagamento',
        submitButton: 'Próximo passo'
      },
      commission: 'Taxa gateway de pagamento',
      header: { col1: 'Descrição', col2: 'Montante' },
      dueAt: 'Vencimento',
      transactionTerms: 'Este valor não é reembolsável'
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
