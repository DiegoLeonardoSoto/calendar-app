import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice
} from '../../../src/store/ui/uiSlice'

describe('test on uiSlice', () => {
  test('should return default state', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
  })

  test('should change isDateModalOpen properly', () => {
    let state = uiSlice.getInitialState()

    state = uiSlice.reducer(state, onOpenDateModal())
    expect(state.isDateModalOpen).toBeTruthy()

    state = uiSlice.reducer(state, onCloseDateModal())
    expect(state.isDateModalOpen).toBeFalsy()
  })
})
