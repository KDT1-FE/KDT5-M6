import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'pages/Router'
import { RecoilRoot } from 'recoil'
import GlobalStyle from 'style/fonts/global'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <GlobalStyle />
    <RouterProvider router={router} />
  </RecoilRoot>
)
