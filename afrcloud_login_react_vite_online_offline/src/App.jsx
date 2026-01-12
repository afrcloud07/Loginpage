import LoginPage from './pages/LoginPage.jsx'
import ALoginPage from './pages/ALoginPage.jsx'
import RedirectPage from './pages/RedirectPage.jsx'
import LogoutPage from './pages/LogoutPage.jsx'
import StatusPage from './pages/StatusPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

export default function App() {
  const page = (window.__PAGE__ || 'login').toLowerCase()

  switch (page) {
    case 'alogin':
      return <ALoginPage />
    case 'redirect':
      return <RedirectPage />
    case 'logout':
      return <LogoutPage />
    case 'status':
      return <StatusPage />
    case 'error':
      return <ErrorPage />
    case 'login':
    default:
      return <LoginPage />
  }
}
