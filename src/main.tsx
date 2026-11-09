import '@fontsource-variable/funnel-display/wght.css'
import '@fontsource-variable/onest/wght.css'
import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'

const container = document.getElementById('root') as HTMLElement
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// No build final o HTML vem pré-renderizado; em desenvolvimento, o root está vazio.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
