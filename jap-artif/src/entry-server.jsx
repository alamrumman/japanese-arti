import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import RouteTree from './RouteTree.jsx'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <RouteTree />
      </StaticRouter>
    </StrictMode>,
  )
}
