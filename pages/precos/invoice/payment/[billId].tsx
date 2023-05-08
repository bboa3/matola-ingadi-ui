import { totalCalculator } from '@common/Prices/invoice/total'
import getLanguage from '@common/Prices/lang/payment/page'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { paymentMethods } from '@lib/validator/payment'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { moneyFormatter } from '@utils/number-formatter'
import { Invoice, Pricing, Transaction } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface Props {
  token: string
  transaction: Transaction
  invoice: Invoice
  pricing: Pricing
  billId: string
}

const CreateBillPage: React.FC<Props> = ({ token, invoice, billId, pricing, transaction }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const { months, dateLocalizer } = getMonths(locale!)
  const [paymentMethod] = useState(paymentMethods[0])

  const { guestsNumber, eventType, eventDate } = invoice

  const { total } = totalCalculator({ pricing, guestsNumber, commission: paymentMethod.commission })

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='w-full flex flex-col items-center min-h-screen mx-auto py-14 overflow-hidden'>
        <section className='w-full max-w-5xl px-6 lg:px-12 mb-24'>
          {
            transaction.transactionType === 'date-reservation'
              ? (
              <h1 className='text-3xl font-medium mb-6'>
                {lang.h1.reservation.text1}
                <span className='font-bold text-green-600'> {eventType}, {dateLocalizer(eventDate, months)}</span>
                , {lang.h1.reservation.text2}
                <span className='font-bold'> {dateLocalizer(transaction.dueAt, months)}</span>.
              </h1>
                )
              : (
              <h1 className='text-3xl font-medium mb-6'>
                {lang.h1.remaining.text1}
                <span className='font-bold text-green-600'> {eventType}, {dateLocalizer(eventDate, months)}</span>.
              </h1>
                )
          }
          <p>
            <span className='font-semibold'>Nome do banco:</span> BCI
          </p>
          <p>
            <span className='font-semibold'>N° da conta</span>: 2151941131001
          </p>
          <p>
            <span className='font-semibold'>Valor a transferir</span>: {moneyFormatter(total)}
          </p>
          <p className='mt-12'>
            {transaction.transactionType === 'date-reservation'
              ? (
                <span className='text-xs text-gray-600'>
                  <span className='text-gray-800'># </span>
                  {lang.transactionTerms}
                </span>
                )
              : null}
          </p>
        </section>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query } = context
  const { billId, invoiceCode, transactionId, resolvedUrl } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `/${locale}/login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: invoice } = await billingHttpFetch.get(`/billing/invoice?billId=${billId}&invoiceCode=${invoiceCode}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  const { transactions, pricingId }: Invoice = invoice

  const transaction = transactions.find(({ id }) => id === transactionId)

  if (!transaction) {
    return {
      redirect: {
        destination: `/${locale}/precos/invoice/${billId}?invoiceCode=${invoiceCode}`,
        permanent: false
      }
    }
  }

  const { data: pricing } = await billingHttpFetch.get(`/billing/pricing/${pricingId}/${locale}`)

  return {
    props: {
      token,
      billId,
      transaction,
      invoice,
      pricing
    }
  }
}

export default CreateBillPage
