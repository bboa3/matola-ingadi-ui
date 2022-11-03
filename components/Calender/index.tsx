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
    <div>
      <Calendar
        tileDisabled={tileDisabled}
        onChange={setSelectedDate}
        value={selectedDate}
      />
    </div>
  )
}

export default CalendarComponent
