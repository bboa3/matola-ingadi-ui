import { BackwardIcon, ChevronLeftIcon, ChevronRightIcon, ForwardIcon } from '@heroicons/react/24/outline'
import { createDateUTC } from '@utils/date'
import { EventDate } from 'bill'
import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { LooseValue, TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'

interface Props {
  reservedDates: EventDate[]
  onChange: React.Dispatch<React.SetStateAction<Date>>
  value: LooseValue
}

const CalendarComponent: React.FC<Props> = ({ reservedDates, value, onChange }) => {
  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    if (view === 'month') {
      const isReserved = reservedDates.find(({ date: reservedDate }) => {
        return createDateUTC(reservedDate).isSame(date)
      })

      if (isReserved) return true
    }

    return false
  }

  return (
    <Calendar
      tileDisabled={tileDisabled}
      locale="pt"
      className='ui-style-calender'
      minDate={new Date()}
      prev2Label={<BackwardIcon className='w-6 h-6' />}
      prevLabel={<ChevronLeftIcon className='w-6 h-6' />}
      next2Label={<ForwardIcon className='w-6 h-6' />}
      nextLabel={<ChevronRightIcon className='w-6 h-6' />}
      value={value}
      onChange={(e: any) => { onChange(e) }}
    />
  )
}

export default CalendarComponent
