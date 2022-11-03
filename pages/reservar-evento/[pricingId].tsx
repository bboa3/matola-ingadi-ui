import CalendarComponent from '@components/Calender'
import Layout from '@components/Layout'
import { httpFetch } from '@lib/fetch'
import { ReservedEventDate } from 'ingadi'
import { GetStaticProps } from 'next'
import React, { useState } from 'react'

// interface Query {
//   pricingId: string
// }

interface Props {
  reservedDates: ReservedEventDate[]
}

const LogIn: React.FC<Props> = ({ reservedDates }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // const router = useRouter()
  // const { pricingId }: Query = router.query

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <p>{ selectedDate.toISOString() }</p>
      <CalendarComponent
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        reservedDates={reservedDates}
      />
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { pricingId: 'premium' } }, { params: { pricingId: 'padrao' } }],
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await httpFetch.get('/dates')

  return {
    props: {
      reservedDates: data
    },
    revalidate: 25 * 60 * 60
  }
}

export default LogIn
