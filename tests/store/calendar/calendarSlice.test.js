import {
  calendarSlice,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent
} from '../../../src/store/calendar/calendarSlice'
import {
  calendarWithEventsState,
  events,
  initialState
} from '../../__fixture/calendarState'

describe('test on calendarSlice', () => {
  test('should return initial state', () => {
    const state = calendarSlice.getInitialState()

    expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent should active the event', () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    )

    expect(state.activeEvent).toEqual(events[0])
  })

  test('onAddNewEvent should update an event', () => {
    const newEvent = {
      id: '1',
      start: new Date('2024-7-8 15:00:00'),
      end: new Date('2024-7-8 17:00:00'),
      title: 'Test title event ',
      notes: 'Test note event '
    }

    const state = calendarSlice.reducer(initialState, onAddNewEvent(newEvent))

    expect(state.events).toEqual([newEvent])
  })

  test('onUpdateEvent should update an event', () => {
    const updatedEvent = {
      id: '1',
      start: new Date('2024-7-8 15:00:00'),
      end: new Date('2024-7-8 17:00:00'),
      title: 'Test title event 1 update',
      notes: 'Test note event 1 update'
    }

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    )

    expect(state.events).toContain(updatedEvent)
  })
})
