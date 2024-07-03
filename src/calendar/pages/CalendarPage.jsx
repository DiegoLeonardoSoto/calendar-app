import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '../'
import { useEffect, useState } from 'react'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'

export const CalendarPage = () => {
  const { user } = useAuthStore()
  const { openDateModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  )

  const eventStylesGetter = (event) => {
    const isMyEvent = user.id === event.user._id || user.uid === event.user._id

    const style = {
      backgroundColor: isMyEvent ? '#347CfC' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    openDateModal()
  }

  const onSelect = (e) => {
    setActiveEvent(e)
  }

  const onViewChanged = (e) => {
    localStorage.setItem('lastView', e)
    setLastView(e)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

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

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
