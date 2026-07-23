import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'

const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function RouteTreeLazy() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Suspense><About /></Suspense>} />
        <Route path="contact" element={<Suspense><Contact /></Suspense>} />
        <Route path="privacy" element={<Suspense><Privacy /></Suspense>} />
        <Route path="terms" element={<Suspense><Terms /></Suspense>} />
        <Route path="*" element={<Suspense><NotFound /></Suspense>} />
      </Route>
    </Routes>
  )
}
