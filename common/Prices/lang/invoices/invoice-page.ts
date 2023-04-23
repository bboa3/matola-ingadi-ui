
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Invoice',
      invoice: {
        createdAt: 'Created at',
        eventType: 'Event Type',
        eventDate: 'Event Date',
        guestsNumber: 'Number of guests',
        service: 'Service',
        total: 'Invoice total amount'
      },
      transaction: {
        title: 'Transaction',
        type: {
          dateReservation: 'Date Reservation',
          remainingPayment: 'Remaining Payment'
        },
        header: { col1: 'Status', col2: 'Transaction for', col3: 'Expiry', col4: 'Total', col5: '% of Invoice' }
      },
      splitInvoiceDescription: {
        text1: 'Your invoice was splitted into two transactions,',
        text2: 'which must be paid immediately to secure your event date and',
        text3: 'for the remainder of the invoice payment.'
      }
    },
    {
      locale: 'pt',
      h1: 'Fatura',
      invoice: {
        createdAt: 'Criada em',
        eventType: 'Evento esperado',
        eventDate: 'Data do evento',
        guestsNumber: 'Número de convidados',
        service: 'Serviço',
        total: 'Total valor da fatura'
      },
      transaction: {
        title: 'Transações',
        type: {
          dateReservation: 'Reserva da Data',
          remainingPayment: 'Restante do Pagamento'
        },
        header: { col1: 'Status', col2: 'Transação para', col3: 'Vencimento', col4: 'Total', col5: '% da Fatura' }
      },
      splitInvoiceDescription: {
        text1: 'A sua fatura for dividida em dua transações,',
        text2: 'que deve ser concluída imediatamente para segurar a data do seu evento e',
        text3: 'para o restante do pagamento da fatura.'
      }
    }
  ]

  return langOptions.find((page) => page.locale === locale)!
}

export default getLanguage
