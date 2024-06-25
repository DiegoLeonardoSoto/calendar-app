import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onSetActiveEvent } from '../store'

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((store) => store.calendar)
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: get backend

    if (calendarEvent._id) {
      //*update
    } else {
      //*create
      //* as the event is new it doesn't have an id, so it's necessary to create one
      dispatch(onAddNewEvent({ ...calendarEvent, _id: crypto.randomUUID() }))
      //! Create the id will not be necessary when the backend will be implemented.
    }
  }

  return {
    //*properties
    events,
    activeEvent,
    //*methods
    setActiveEvent,
    startSavingEvent
  }
}
