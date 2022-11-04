import Input from '@components/Form/Imput'
import Radio from '@components/Form/Radio'
import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout'
import { DataContext } from '@context/data'
import { CheckIcon } from '@heroicons/react/24/outline'
import { httpFetch } from '@lib/fetch'
import validator, { eventTypes, paymentMethods } from '@lib/validator/event-reservation'
import { dateFormatter } from '@utils/day'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { ReservedEventDate } from 'ingadi'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useCallback, useContext, useState } from 'react'

const CalendarComponent = dynamic(() => import('@components/Form/Calender'), {
  ssr: false
})

interface Props {
  reservedDates: ReservedEventDate[]
}

const ReservationInfo: React.FC<Props> = ({ reservedDates }) => {
  const { data, setData } = useContext(DataContext)
  const router = useRouter()
  const { pricingId } = router.query
  const [eventType, setEventType] = useState(eventTypes[0])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateError, setDateError] = useState('')

  const { errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      guestsNumber: 0,
      paymentMethodId: ''
    },
    validate: (_values) => {
      if (!selectedDate) { return setDateError('Selecione a data do evento') }
    },
    validationSchema: validator,
    onSubmit: (values) => {
      const eventDate = dayjs(selectedDate).format('YYYY-MM-DD')

      setData({
        ...data,
        eventReservation: {
          eventDate,
          guestsNumber: values.guestsNumber,
          eventType: eventType.id,
          paymentMethodId: values.paymentMethodId,
          eventPricingId: pricingId as string
        }
      })
      router.push('/atualizar-perfil')
    }
  })

  const dateFormatterCallback = useCallback(() => {
    if (!selectedDate) return null

    return dateFormatter(selectedDate)
  }, [selectedDate])

  const formattedDate = dateFormatterCallback()
  return (
    <Layout
      title=''
      keywords=''
      description=''
    >
      <div className='flex justify-center py-24' >
          <form onSubmit={handleSubmit} className="w-full h-full max-w-2xl space-y-5">
            <div className='w-full h-full space-y-3'>
              <label
                htmlFor='event-date'
                className="block text-2xl font-medium text-gray-700 "
              >
                Selecione a data do evento no calendário abaixo.
              </label>
              {
                formattedDate
                  ? (
                  <span className='flex text-sm text-gray-700'>
                    <CheckIcon className="h-5 w-5 mr-3 text-green-600" aria-hidden="true" />
                    <span>{formattedDate}</span>
                  </span>
                    )
                  : null
              }

              <span className='h-2 text-sm text-red-500'>{dateError}</span>
              <CalendarComponent
                value={selectedDate}
                onChange={(e: Date) => {
                  setDateError('')
                  setSelectedDate(e)
                }}
                reservedDates={reservedDates}
              />
            </div>

            <SelectMenu
              label='Evento'
              selected={eventType}
              setSelected={setEventType}
              items={eventTypes}
            />

            <Input
              label='Numero de seus convidados'
              id='guestsNumber'
              type='number'
              min='1'
              placeholder='Digite o número'
              onChange={handleChange}
              error={errors.guestsNumber}
            />

            <Radio
              label='Forma de Pagamento para sua reserva'
              name='paymentMethodId'
              id='paymentMethodId'
              items={paymentMethods}
              onChange={handleChange}
              error={errors.paymentMethodId}
            />

            <div className='pt-5'>
              <button
                type='submit'
                className='w-full h-12 flex justify-center items-center font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800'
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
