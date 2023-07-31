import { Outlet } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from 'style/index'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </>
  )
}
