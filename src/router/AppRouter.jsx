import { Navigate, Route, Routes } from 'react-router'
import { CalendarPage } from '../calendar'
import { LoginPage } from '../auth'

export const AppRouter = () => {
  const authStatus = true

  return (
    <Routes>
      {authStatus ? (
        <Route path="/*" element={<CalendarPage />} />
      ) : (
        <Route path="/auth/*" element={<LoginPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
