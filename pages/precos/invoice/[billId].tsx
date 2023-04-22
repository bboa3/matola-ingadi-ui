import getLanguage from '@common/Prices/lang/payment/page'
import CardUserInvoices from '@components/Cards/CardUserInvoices'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { Invoice } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  token: string
  billId: string
  invoice: Invoice
}

const CreateBillPage: React.FC<Props> = ({ invoice, billId }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const { months, dateLocalizer } = getMonths(locale!)
  const { transactions, createdAt, invoiceCode } = invoice

  const createdAtLocalized = dateLocalizer(createdAt, months)

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | MozEconomia'
      description='Preço dos serviços da MozEconomia'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='w-full flex justify-center items-center pb-8 pt-14 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-5xl'>
          <div className='mb-3'>
            <p className='font-bold text-3xl'>
              {lang.h1} #{invoice.invoiceCode}
            </p>
            <span className='text-lg'>
              {createdAtLocalized}
            </span>
          </div>
          <CardUserInvoices
            locale={locale!}
            invoiceCode={invoiceCode}
            billId={billId}
            transactions={transactions}
          />
        </div>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query } = context
  const { billId, invoiceCode, resolvedUrl } = query

  const token = req.cookies[cookiesName]
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !token) {
    return {
      redirect: {
        destination: `login?callbackUrl=${nextAuthUrl}/${locale}${resolvedUrl}`,
        permanent: false
      }
    }
  }

  const { data: invoice } = await billingHttpFetch.get(`/billing/invoice?billId=${billId}&invoiceCode=${invoiceCode}`, {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      token,
      billId,
      invoice
    }
  }
}

export default CreateBillPage
