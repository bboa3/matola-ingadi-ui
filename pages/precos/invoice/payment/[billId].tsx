import DateReservationComponent from '@common/Prices/lang/payment/DateReservation'
import RemainingPaymentComponent from '@common/Prices/lang/payment/RemainingPayment'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { Invoice, Pricing, Transaction } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import React from 'react'

interface Props {
  token: string
  transaction: Transaction
  invoice: Invoice
  pricing: Pricing
  billId: string
}

const CreateBillPage: React.FC<Props> = ({ token, invoice, billId, pricing, transaction }) => {
  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      {
        transaction.transactionType === 'date-reservation'
          ? (
          <DateReservationComponent
            token={token}
            transaction={transaction}
            invoice={invoice}
            pricing={pricing}
            billId={billId}
          />
            )
          : (
          <RemainingPaymentComponent
            transaction={transaction}
            invoice={invoice}
            pricing={pricing}
          />
            )
      }
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
