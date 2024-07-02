import { createSlice } from '@reduxjs/toolkit'

export const STATUS = {
  CHECKING: 'checking',
  NOT_AUTH: 'not-authenticated',
  AUTH: 'authenticated'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: STATUS.CHECKING,
    user: {},
    errorMessage: undefined
  },
  reducers: {
    onChecking: (state) => {
      state.status = STATUS.CHECKING
      state.user = {}
      state.errorMessage = undefined
    },

    onLogin: (state, { payload }) => {
      state.status = STATUS.AUTH
      state.user = payload
      state.errorMessage = undefined
    },

    onLogout: (state, { payload }) => {
      state.status = STATUS.NOT_AUTH
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    }
  }
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions
