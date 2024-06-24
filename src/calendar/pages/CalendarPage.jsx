import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { getMessagesES, localizer } from '../../helpers'

const events = [
  {
    title: 'cumple',
    notes: 'asdasdasd',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Diego'
    }
  }
]

import { Navbar } from '../'

export const CalendarPage = () => {
  const eventStylesGetter = (e, start, end, isSelected) => {
    console.log({ e, start, end, isSelected })

    const style = {
      backgroundColor: '#347CfC',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100dvh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStylesGetter}
      />
    </>
  )
}
