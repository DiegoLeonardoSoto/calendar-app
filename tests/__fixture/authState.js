import { STATUS } from '../../src/store/auth/authSlice'

export const initialState = {
  status: STATUS.CHECKING,
  user: {},
  errorMessage: undefined
}

export const authenticatedState = {
  status: STATUS.AUTH,
  user: {
    uid: 'abc',
    name: 'Diego'
  },
  errorMessage: undefined
}

export const notAuthenticatedState = {
  status: STATUS.NOT_AUTH,
  user: {},
  errorMessage: undefined
}
