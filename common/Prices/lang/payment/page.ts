
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Invoice',
      form: {
        paymentMethod: 'Select your payment method',
        paymentMethodSelected: 'is currently selected as your payment method',
        submitButton: 'Next Step'
      },
      commission: 'Payment gateway fee',
      header: { col1: 'Description', col2: 'Amount' },
      dueAt: 'Due',
      transaction: {
        type: {
          dateReservation: 'Date Reservation',
          remainingPayment: 'Remaining Payment'
        },
        header: { col1: 'Transaction for', col2: 'Expiry', col3: 'Total', col4: '% of Invoice', col5: 'Status' }
      }
    },
    {
      locale: 'pt',
      h1: 'Fatura',
      form: {
        paymentMethod: 'Selecione a sua forma de Pagamento',
        paymentMethodSelected: 'está atualmente selecionado como seu método de pagamento',
        submitButton: 'Próximo passo'
      },
      commission: 'Taxa gateway de pagamento',
      header: { col1: 'Descrição', col2: 'Montante' },
      dueAt: 'Vencimento',
      transaction: {
        type: {
          dateReservation: 'Reserva da Data',
          remainingPayment: 'Restante do Pagamento'
        },
        header: { col1: 'Transação para', col2: 'Vencimento', col3: 'Total', col4: '% da Fatura', col5: 'Status' }
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
