import getLanguage from '@common/Prices/lang/payment/page'
import CardUserInvoices from '@components/Cards/CardUserInvoices'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { moneyFormatter } from '@utils/number-formatter'
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
  const { transactions, createdAt, invoiceCode, eventDate, eventType, guestsNumber, total, activity } = invoice

  const createdAtLocalized = dateLocalizer(createdAt, months)
  const eventDateLocalized = dateLocalizer(eventDate, months)

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | MozEconomia'
      description='Preço dos serviços da MozEconomia'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='w-full flex flex-col justify-center items-center pb-8 pt-14 px-9 sm:px-6 lg:px-8'>
        <div className='w-full h-full max-w-5xl relative bg-white py-6 rounded-lg divide-y'>
          <div className='space-y-7 lg:space-y-0 lg:grid grid-cols-2 gap-4'>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold'>
                {lang.h1} #{invoice.invoiceCode}
              </h1>
              <p className='text-lg'>
                Criada em {createdAtLocalized}
              </p>
            </div>
            <div className='w-full lg:flex justify-end'>
              <div className='max-w-[22rem] w-full'>
              </div>
            </div>
          </div>
          <div className='lg:divide-x lg:grid grid-cols-2 gap-4 py-3'>
            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pr-3'>
              <div className='space-y-4'>
                <div className=''>
                  <span className='block text-sm text-gray-500'>Evento esperado</span>
                  <p className='text-xl font-medium'>{eventType}</p>
                </div>
                <div>
                  <span className='block text-sm text-gray-500'>Data do evento</span>
                  <p className='text-sm font-medium'>{eventDateLocalized}</p>
                </div>
              </div>

              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Número de convidados</span>
                  <p className='text-sm font-medium'>{guestsNumber}</p>
                </div>
              </div>
            </div>

            <div className='lg:grid grid-cols-2 gap-4 py-3 lg:pl-3'>
              <div className='space-y-4'>
                <div className='py-3'>
                  <span className='block text-sm text-gray-500'>Fatura para</span>
                  <p className='text-sm font-medium'>{activity.name}</p>
                </div>
              </div>
              <div className='space-y-4'>
                <div>
                  <span className='block text-sm text-gray-500'>Total valor da fatura</span>
                  <p className='text-xl font-medium'>{moneyFormatter(total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full max-w-5xl'>
          <div className=''>
            <div className='my-6'>
              <h2 className='text-2xl font-semibold'>Transações</h2>
              <p className='text-sm my-1 max-w-4xl text-gray-600'>
                A sua fatura for dividida em dua transações,
                <span className='font-bold'> 25% </span>
                que deve ser concluída imediatamente para reservar a data do seu evento e
                <span className='font-bold'> 75% </span>
                para o restante do pagamento da fatura.
              </p>
            </div>
            <CardUserInvoices
              locale={locale!}
              invoiceCode={invoiceCode}
              billId={billId}
              transactions={transactions}
            />
          </div>
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
