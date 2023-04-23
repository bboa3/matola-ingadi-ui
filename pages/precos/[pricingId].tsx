import getLanguage from '@common/Prices/lang/bills/page'
import { Button } from '@components/Button'
import SimpleLayout from '@components/Layout/MatolaIngadi/SimpleLayout'
import { billingHttpFetch } from '@lib/fetch'
import { authOptions } from '@pages/api/auth/[...nextauth]'
import { createDate } from '@utils/date'
import { getMonths } from '@utils/date/months'
import { cookiesName, nextAuthUrl } from '@utils/env'
import { EventDate } from 'bill'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
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

const CreateBillPage: React.FC<Props> = ({ pricingId, reservedDates }) => {
  const { locale } = useRouter()
  const lang = getLanguage(locale!)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { months, dateLocalizer } = getMonths(locale!)

  const eventDate = createDate(selectedDate).format('YYYY-MM-DD')

  return (
    <SimpleLayout
      robots='noindex nofollow'
      title='Preços | Matola Ingadi'
      description='Preço dos serviços da Matola Ingadi. Organizamos eventos que caminham de mãos dadas com o amor, felicidade, amizade, carinho e companheirismo.'
      keywords='Matola Ingadi, Salão de Eventos, Casamentos, Aniversários'
    >
      <div className='flex flex-col min-h-full items-center justify-center pb-12 pt-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-6xl p-3'>
          <span className='text-2xl block text-left text-gray-900'>
            {lang.h1}
          </span>
        </div>
        <div className='w-full max-w-6xl h-full bg-gray-50 space-y-3 rounded-lg'>
          <p className='p-5 mt-3 text-3xl font-semibold text-center'>
            {dateLocalizer(selectedDate, months)}
          </p>
          <CalendarComponent
            value={selectedDate}
            onChange={setSelectedDate}
            reservedDates={reservedDates}
          />
        </div>

        <Button solid>
          <Link href={`/precos/bill/${pricingId}?eventDate=${eventDate}`} >
            <span className='w-36 lg:w-40 block'>
              {lang.form.submitButton}
              <span className='text-2xl' aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        </Button>
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

  const { data: reservedDates } = await billingHttpFetch.get('/billing/dates/40', {
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
