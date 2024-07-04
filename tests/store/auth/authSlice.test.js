import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  STATUS
} from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../__fixture/authState'
import { testUserCredentials } from '../../__fixture/testUser'

describe('test on authSlice', () => {
  test('should return initial state', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('should login with test user', () => {
    const state = authSlice.reducer(state, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: STATUS.AUTH,
      user: testUserCredentials,
      errorMessage: undefined
    })
  })

  test('should logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())

    expect(state).toEqual({
      status: STATUS.NOT_AUTH,
      user: {},
      errorMessage: undefined
    })
  })

  test('should logout with errorMessage', () => {
    const errorMessage = 'Credenciales no validas'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    expect(state).toEqual({
      status: STATUS.NOT_AUTH,
      user: {},
      errorMessage: errorMessage
    })
  })

  test('should clean error message', () => {
    const errorMessage = 'Credenciales no validas'
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))

    const newState = authSlice.reducer(state, clearErrorMessage())

    expect(newState.errorMessage).toBe(undefined)
  })

  test('should put the state on checking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking())

    expect(state).toEqual(initialState)
  })
})
