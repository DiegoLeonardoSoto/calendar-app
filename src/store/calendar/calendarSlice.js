import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

//!this has to come from backend
const tempEvent = {
  _id: crypto.randomUUID(),
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
//!-----------------------------

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload
    }
  }
})

export const { onSetActiveEvent } = calendarSlice.actions
