import { configureStore } from '@reduxjs/toolkit'
import { authSlice, STATUS } from '../../src/store'
import { initialState, notAuthenticatedState } from '../__fixture/authState'
import { renderHook, waitFor } from '@testing-library/react'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { Provider } from 'react-redux'
import { act } from 'react'
import { testUserCredentials } from '../__fixture/testUser'
import { calendarApi } from '../../src/api'
import { AUTH_ENDPOINTS } from '../../src/api/calendarEndpoints'

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}

const renderHookWithStore = (store) => {
  return renderHook(() => useAuthStore(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
  })
}

describe('test on useAuthStore', () => {
  //!----------------------------------------------------------------------------------
  //* clear localStorage before each test to avoid false positive
  beforeEach(() => localStorage.clear())

  test('should return initial state', () => {
    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHookWithStore(mockStore)

    expect(result.current).toEqual({
      status: 'checking',
      user: {},
      errorMessage: undefined,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function)
    })
  })
  //!----------------------------------------------------------------------------------
  test('startLogic should log in successfully', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHookWithStore(mockStore)

    //* both, act and the test are async because startLogin does HTTP requests
    await act(async () => await result.current.startLogin(testUserCredentials))

    const { status, user, errorMessage } = result.current

    expect({ status, user, errorMessage }).toEqual({
      status: STATUS.AUTH,
      user: { name: 'Test user', uid: '6685934651af64d2c1db690a' },
      errorMessage: undefined
    })

    //* check if a token was generated after the login
    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })
  //!----------------------------------------------------------------------------------
  test('startLogic should fail on the login', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHookWithStore(mockStore)

    //* both, act and the test are async because startLogin does HTTP requests
    await act(
      async () =>
        await result.current.startLogin({
          email: 'thisTest@gmail.com',
          password: 'hasToFail'
        })
    )

    const { status, user, errorMessage } = result.current

    expect({ status, user, errorMessage }).toEqual({
      status: STATUS.NOT_AUTH,
      user: {},
      errorMessage: expect.any(String)
    })
    expect(localStorage.getItem('token')).toBe(null)

    //* in the custom hook after 10ms the error message must be cleared
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined))
  })
  //!----------------------------------------------------------------------------------
  test('startRegister should create a new user', async () => {
    const newUser = {
      email: 'something@gmail.com',
      password: '123456789',
      name: 'Test user 2'
    }

    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHookWithStore(mockStore)

    //* this test will fail if the same user is created every time, to solve this,
    //* it is necessary to create a "spy" to return a mock value and not do an HTTP request to the server
    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        uid: 'test-123456789',
        name: 'Test user',
        token: 'test-token'
      }
    })

    await act(async () => await result.current.startRegister(newUser))

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test user', uid: 'test-123456789' }
    })

    //* is necessary delete all spy after the test
    spy.mockRestore()
  })
  //!----------------------------------------------------------------------------------
  test('startRegister should fail', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHookWithStore(mockStore)

    await act(
      async () => await result.current.startRegister(testUserCredentials)
    )

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Ese email ya esta en uso',
      status: STATUS.NOT_AUTH,
      user: {}
    })
  })
  //!----------------------------------------------------------------------------------
  test("checkAuthToken should fail if there isn't a token", async () => {
    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHookWithStore(mockStore)

    //* as localStorage is clean before every test checkAuthToken will fail because it isn't going to find any token
    await act(async () => await result.current.checkAuthToken())

    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: STATUS.NOT_AUTH,
      user: {}
    })
  })
  //!----------------------------------------------------------------------------------
  test('checkAuthToken should authenticate the user if there is a token', async () => {
    //* log in with test user to generate a token
    const { data } = await calendarApi.post(
      AUTH_ENDPOINTS.LOGIN_USER,
      testUserCredentials
    )

    localStorage.setItem('token', data.token)

    const mockStore = getMockStore({ ...initialState })

    const { result } = renderHookWithStore(mockStore)

    await act(async () => await result.current.checkAuthToken())

    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test user', uid: '6685934651af64d2c1db690a' }
    })
  })
})
