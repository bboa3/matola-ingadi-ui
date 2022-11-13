import Input from '@components/Form/Imput'
import SelectMenu from '@components/Form/Select'
import Layout from '@components/Layout/User'
import { DataContext } from '@context/data'
import { CheckIcon } from '@heroicons/react/24/outline'
import { httpFetch } from '@lib/fetch'
import validator, { eventTypes } from '@lib/validator/event-reservation'
import { dateFormatter } from '@utils/day'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { ReservedEventDate } from 'ingadi'
import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
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
  const session = useSession()
  const { data, setData } = useContext(DataContext)
  const router = useRouter()
  const { pricingId } = router.query
  const [eventType, setEventType] = useState(eventTypes[0])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateError, setDateError] = useState('')

  const { errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      guestsNumber: 0
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
          eventPricingId: pricingId as string
        }
      })
      router.push('/user/information')
    }
  })

  const dateFormatterCallback = useCallback(() => {
    if (!selectedDate) return null

    return dateFormatter(selectedDate)
  }, [selectedDate])

  const formattedDate = dateFormatterCallback()

  const user = session.data?.user

  return (
    <Layout
      title=''
      keywords=''
      description=''
      avatar={user?.image ? user.image : undefined}
    >
      <div className="flex flex-wrap justify-center mt-4">
        <div className='w-full h-full max-w-2xl relative'>
          <form onSubmit={handleSubmit} className="w-full h-full max-w-2xl space-y-5">
            <div className='w-full h-full bg-gray-50 space-y-3 rounded-lg'>
              <p className='p-5 pb-0'>
                {
                  formattedDate
                    ? (
                    <span className='flex justify-center items-center text-lg font-medium text-gray-700'>
                      <CheckIcon className="h-5 w-5 mr-3 text-green-600" aria-hidden="true" />
                      <span>{formattedDate}</span>
                    </span>
                      )
                    : null
                }
                <label
                  htmlFor='event-date'
                  className="block text-xs text-center pt-2 text-gray-700 "
                >
                  Selecione a data do evento no calendário abaixo.
                </label>
              </p>
              <CalendarComponent
                value={selectedDate}
                onChange={(e: Date) => {
                  setDateError('')
                  setSelectedDate(e)
                }}
                reservedDates={reservedDates}
              />
              <span className='h-2 p-1 text-sm text-red-500'>{dateError}</span>
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
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const { data } = await httpFetch.get('/dates')

  return {
    props: {
      reservedDates: data
    }
  }
}

export default ReservationInfo
