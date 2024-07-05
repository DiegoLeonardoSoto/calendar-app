import { renderHook } from '@testing-library/react'
import { useUiStore } from '../../src/hooks/useUiStore'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { uiSlice } from '../../src/store/ui/uiSlice'
import { act } from 'react'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}

describe('test on useUiStore', () => {
  test('should return initial state', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function)
    })
  })

  test('should set isDateModalOpen as true', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    const { openDateModal } = result.current

    act(() => openDateModal())

    expect(result.current.isDateModalOpen).toBeTruthy()
  })

  test('should set isDateModalOpen as false', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    })

    act(() => result.current.closeDateModal())

    expect(result.current.isDateModalOpen).toBeFalsy()
  })
})
