import { useDispatch, useSelector } from 'react-redux'
import { onSetActiveEvent } from '../store'

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((store) => store.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    //*properties
    events,
    activeEvent,
    //*methods
    setActiveEvent
  }
}
