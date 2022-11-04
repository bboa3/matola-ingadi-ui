import { BackwardIcon, ChevronLeftIcon, ChevronRightIcon, ForwardIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { ReservedEventDate } from 'ingadi'
import React from 'react'
import Calendar, { CalendarTileProperties } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export type TileDisabled = (data: CalendarTileProperties) => boolean

interface Props {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  reservedDates: ReservedEventDate[]
}

const CalendarComponent: React.FC<Props> = ({ selectedDate, setSelectedDate, reservedDates }) => {
  const tileDisabled: TileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const isReserved = reservedDates.find(({ date: dDate }) => {
        const dates = dDate.split('-')
        const year = Number(dates[0])
        const month = Number(dates[1])
        const day = Number(dates[2])

        const reservedDate = dayjs(new Date(year, month - 1, day))
        return reservedDate.isSame(date)
      })

      if (isReserved) return true
    }

    return false
  }

  return (
    <Calendar
      tileDisabled={tileDisabled}
      locale="pt"
      onChange={setSelectedDate}
      value={selectedDate}
      className='styled-calender'
      minDate={new Date()}
      prev2Label={<BackwardIcon className='w-6 h-6' />}
      prevLabel={<ChevronLeftIcon className='w-6 h-6' />}
      next2Label={<ForwardIcon className='w-6 h-6' />}
      nextLabel={<ChevronRightIcon className='w-6 h-6' />}
    />
  )
}

export default CalendarComponent
