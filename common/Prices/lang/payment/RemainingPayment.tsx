import { totalCalculator } from '@common/Prices/invoice/total'
import getLanguage from '@common/Prices/lang/payment/page'
import { paymentMethods } from '@lib/validator/payment'
import { getMonths } from '@utils/date/months'
import { moneyFormatter } from '@utils/number-formatter'
import { Invoice, Pricing, Transaction } from 'bill'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface Props {
  transaction: Transaction
  invoice: Invoice
  pricing: Pricing
}

const DateReservationComponent: React.FC<Props> = ({ invoice, pricing, transaction }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const { months, dateLocalizer } = getMonths(locale!)
  const [paymentMethod] = useState(paymentMethods[0])

  const { guestsNumber, eventType, eventDate } = invoice

  const { total } = totalCalculator({ pricing, guestsNumber, commission: paymentMethod.commission })

  return (
    <div className='w-full flex flex-col items-center min-h-screen mx-auto py-14 overflow-hidden'>
      <section className='w-full max-w-5xl px-6 lg:px-12 mb-24'>
          <h1 className='text-3xl font-medium mb-6'>
            {lang.h1.reservation.text1}
            <span className='font-bold text-green-600'> {eventType}, {dateLocalizer(eventDate, months)}</span>
            , {lang.h1.reservation.text2}
            <span className='font-bold'> {dateLocalizer(transaction.dueAt, months)}</span>.
          </h1>
          <p>
            <span className='font-semibold'>Nome do banco:</span> Standard Bank
          </p>
          <p>
            <span className='font-semibold'>N° da conta</span>: 1086564331002
          </p>
          <p>
            <span className='font-semibold'>NIB</span>: 0003 0108 0656 4331 0026 6
          </p>
          <p>
            <span className='font-semibold'>Valor a transferir</span>: {moneyFormatter(total)}
          </p>
          <p className='mt-12'>
            <span className='text-xs text-gray-600'>
              <span className='text-gray-800'># </span>
              {lang.transactionTerms}
            </span>
          </p>
      </section>
    </div>
  )
}

export default DateReservationComponent
