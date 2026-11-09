import { lazy } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { PRIVACY_PATH, QUOTE_PATH } from './data/navigation'
import { HomePage } from './pages/HomePage'

const QuotePage = lazy(() => import('./pages/QuotePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={QUOTE_PATH} element={<QuotePage />} />
        <Route path={PRIVACY_PATH} element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
