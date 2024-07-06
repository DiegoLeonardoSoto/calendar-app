import { render, screen } from '@testing-library/react'
import { AppRouter } from '../../src/router/AppRouter'
import { STATUS } from '../../src/store'
import { useAuthStore } from '../../src/hooks'
import { MemoryRouter } from 'react-router'

jest.mock('../../src/hooks/useAuthStore')

//* This is a mock of a React component
jest.mock('../../src/calendar', () => ({
  CalendarPage: () => <h1>Calendar Page</h1>
}))

//* Para esta prueba se modifico el jest.config

describe('tests on <AppRouter/>', () => {
  const mockCheckAuthToken = jest.fn()

  //!----------------------------------------------------------------------------------
  test('should show load screen and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: STATUS.CHECKING,
      checkAuthToken: mockCheckAuthToken
    })

    render(<AppRouter />)

    expect(screen.getByText('Cargando...')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  //!----------------------------------------------------------------------------------
  test('should show the login page if the user is not authenticated', () => {
    useAuthStore.mockReturnValue({
      status: STATUS.NOT_AUTH,
      checkAuthToken: mockCheckAuthToken
    })

    const { container } = render(
      <MemoryRouter initialEntries={['/auth2/something/']}>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('Ingreso')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  //!----------------------------------------------------------------------------------
  test('should show the calendar page if the user is authenticated', () => {
    useAuthStore.mockReturnValue({
      status: STATUS.AUTH,
      checkAuthToken: mockCheckAuthToken
    })

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('Calendar Page')).toBeTruthy()
  })
})
