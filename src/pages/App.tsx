import { Route, Routes } from 'react-router-dom'
import { Layout, HeaderLayout, AuthGuard } from 'components/index'

import { HomePage, WeeklyPage, Chart, Monthly, LoginPage, Search } from 'pages/index'
import { SignUp } from 'components/index'

export const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Layout />}>
        <Route
          index
          element={<LoginPage />}
        />
        <Route
          path="signup"
          element={<SignUp />}
        />
      </Route>
      <Route
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }>
        <Route
          path="/"
          element={<HomePage />}
        />
      </Route>
      <Route
        element={
          <AuthGuard>
            <HeaderLayout />
          </AuthGuard>
        }>
        <Route
          path="/calendar"
          element={<Monthly />}
        />
        <Route
          path="/chart"
          element={<Chart />}
        />
        <Route
          path="/weekly"
          element={<WeeklyPage />}
        />
        <Route
          path="/search"
          element={<Search />}
        />
      </Route>
    </Routes>
  )
}
