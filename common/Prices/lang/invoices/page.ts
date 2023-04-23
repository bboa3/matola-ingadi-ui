
const getLanguage = (locale: string) => {
  const langOptions = [
    {
      locale: 'en',
      h1: 'Invoice',
      invoice: {
        header: { col1: 'Status', col2: 'Event Type', col3: 'Event Date', col4: 'Created At', col5: 'Total' }
      },
      splitInvoiceDescription: {
        text1: 'Your invoice was splitted into two transactions,',
        text2: 'which must be paid immediately to secure your event date and',
        text3: 'for the remainder of the invoice payment.'
      }
    },
    {
      locale: 'pt',
      h1: 'Faturas',
      invoice: {
        header: { col1: 'Status', col2: 'Evento', col3: 'Data do evento', col4: 'Criada em', col5: 'Total' }
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
