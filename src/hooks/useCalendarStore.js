import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'

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

      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      //*create
      //* as the event is new it doesn't have an id, so it's necessary to create one
      dispatch(onAddNewEvent({ ...calendarEvent, _id: crypto.randomUUID() }))
      //! Create the id will not be necessary when the backend will be implemented.
    }
  }

  const startDeletingEvent = () => {
    //TODO:get backend
    dispatch(onDeleteEvent())
  }

  return {
    //*properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}
