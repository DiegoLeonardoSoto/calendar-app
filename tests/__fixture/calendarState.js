export const events = [
  {
    id: '1',
    start: new Date('2024-7-4 15:00:00'),
    end: new Date('2024-7-4 17:00:00'),
    title: 'Test title event',
    notes: 'Test note event'
  },
  {
    id: '2',
    start: new Date('2024-10-4 15:00:00'),
    end: new Date('2024-10-4 17:00:00'),
    title: 'Test title event 2',
    notes: 'Test note event 2'
  }
]

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null
}

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null
}

export const calendarWithActiveEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] }
}
