import { Navigate, Route, Routes } from 'react-router'
import { CalendarPage } from '../calendar'
import { LoginPage } from '../auth'
import { useAuthStore } from '../hooks'
import { STATUS } from '../store'
import { useEffect } from 'react'

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === STATUS.CHECKING) {
    return <h3>Cargando...</h3>
  }

  return (
    <Routes>
      {status === STATUS.AUTH ? (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  )
}
