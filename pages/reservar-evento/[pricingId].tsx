import Input from '@components/Form/Imput'
import Radio from '@components/Form/Radio'
import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout'
import { httpFetch } from '@lib/fetch'
import validator, { eventTypes, paymentMethods } from '@lib/validator/event-reservation'
import dayjs from 'dayjs'
import { ReservedEventDate } from 'ingadi'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const CalendarComponent = dynamic(() => import('@components/Form/Calender'), {
  ssr: false
})

interface Props {
  reservedDates: ReservedEventDate[]
}

const ReservationInfo: React.FC<Props> = ({ reservedDates }) => {
  const [numberOfGuests, setNumberOfGuests] = useState('')
  const [eventType, setEventType] = useState(eventTypes[0])
  const [paymentMethodId, setPaymentMethodId] = useState(paymentMethods[0].id as string)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [dateError, setDateError] = useState('')

  const router = useRouter()
  const { pricingId } = router.query

  const formSubmit = () => {
    if (selectedDate <= new Date()) { return setDateError('Diga-nos a data em pretende realizar o seu evento') }

    setDateError('')

    const eventDate = dayjs(selectedDate).format('YYYY-MM-DD')

    const validated = validator.cast({
      numberOfGuests,
      eventType,
      paymentMethodId
    })

    const response = httpFetch.post('/bill', {
      eventDate,
      numberOfGuests: validated.numberOfGuests,
      eventType: validated.eventType,
      paymentMethodId: validated.paymentMethodId,
      eventPricingId: pricingId
    })

    console.log(response)

    router.push('/atualizar-perfil')
  }

  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className='flex justify-center'>
          <form className="w-full h-full max-w-2xl space-y-5">
            <div className='w-full h-full space-y-3'>
              <label htmlFor='event-date' className="block text-sm font-medium text-gray-700">
                Data da realização do evento
              </label>
              <h3>{dayjs(selectedDate).format('DD/MM/YYYY')}</h3>
              <CalendarComponent
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                reservedDates={reservedDates}
              />
              <span>{dateError}</span>
            </div>

            <SelectMenu
              label='Evento'
              selected={eventType}
              setSelected={setEventType}
              items={eventTypes}
            />

            <Input
              label='Numero de seus convidados'
              id='guests-number'
              type='number'
              min='1'
              placeholder='Digite o número'
              setValue={setNumberOfGuests}
            />

            <Radio
              label='Forma de Pagamento para sua reserva'
              name='payment-method'
              setValue={setPaymentMethodId}
              items={paymentMethods}
            />

            <div className='pt-5'>
              <button
                onClick={() => formSubmit()}
                className='w-full h-12 flex justify-center items-center rounded-lg bg-gray-900 hover:bg-gray-800'
                >
                Fazer reserva
              </button>
            </div>
          </form>
      </div>
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

export default ReservationInfo
