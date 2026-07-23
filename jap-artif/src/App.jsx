import { BrowserRouter } from 'react-router-dom'
import RouteTreeLazy from './RouteTreeLazy.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <RouteTreeLazy />
    </BrowserRouter>
  )
}
