import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent, Navbar } from '../'
import { useState } from 'react'

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

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  )

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

  const onDoubleClick = (e) => {
    console.log({ doubleClick: e })
  }

  const onSelect = (e) => {
    console.log({ click: e })
  }

  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100dvh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStylesGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
    </>
  )
}
