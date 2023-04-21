import getLanguage from '@common/Prices/lang/bills/page'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { EventDate } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const CalendarComponent = dynamic(() => import('@components/Form/Calender'), {
  ssr: false
})

interface Props {
  pricingId: string
  token: string,
  reservedDates: EventDate[]
}

const CreateBillPage: React.FC<Props> = ({ pricingId, token, reservedDates }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { months, dateLocalizer } = getMonths(locale!)

  const dateLocalized = dateLocalizer(selectedDate, months)

  console.log(lang)

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | MozEconomia'
      description='Preço dos serviços da MozEconomia'
      keywords='moçambique, economia, dados, finança, comércio, mercado, capital, despesas, Hipoteca, dinheiro'
    >
      <div className='flex flex-col min-h-full items-center justify-center pb-12 pt-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-6xl p-3'>
          <span className='text-2xl block text-left text-gray-900'>
            Selecione a data do evento no calendário abaixo.
          </span>
        </div>
        <div className='w-full max-w-6xl h-full bg-gray-50 space-y-3 rounded-lg'>
          <p className='p-5 mt-3 text-3xl font-semibold text-center'>
            {dateLocalized}
          </p>
          <CalendarComponent
            value={selectedDate}
            onChange={setSelectedDate}
            reservedDates={reservedDates}
          />
          <span className='h-2 p-1 text-sm text-red-500'>{}</span>
        </div>
      </div>
    </SimpleLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, locale, query, resolvedUrl } = context
  const { pricingId } = query

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

  const { data: reservedDates } = await billingHttpFetch.get('/billing/dates/10', {
    headers: { Authorization: `beaer ${token}` }
  })

  return {
    props: {
      pricingId,
      token,
      reservedDates
    }
  }
}

export default CreateBillPage
