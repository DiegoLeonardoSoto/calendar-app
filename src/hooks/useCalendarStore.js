import { useDispatch, useSelector } from 'react-redux'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent
} from '../store'
import calendarApi from '../api/calendarApi'
import { EVENTS_ENDPOINTS } from '../api/calendarEndpoints'
import { convertEventsToDateEvents } from '../helpers'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((store) => store.calendar)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //*Update

        await calendarApi.put(
          EVENTS_ENDPOINTS.UPDATE_EVENT + calendarEvent.id,
          calendarEvent
        )

        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      //*Create
      const { data } = await calendarApi.post(
        EVENTS_ENDPOINTS.CREATE_EVENT,
        calendarEvent
      )
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingEvent = () => {
    //TODO:get backend
    dispatch(onDeleteEvent())
  }

  const startLoadingEvents = async () => {
    try {
      //*Read
      const { data } = await calendarApi.get(EVENTS_ENDPOINTS.READ_EVENTS)

      const events = convertEventsToDateEvents(data.events)

      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log('error cargando eventos')
      console.log(error)
    }
  }

  return {
    //*properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //*methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
