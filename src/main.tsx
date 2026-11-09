import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// The mock API runs only in development. It must start before the app renders,
// otherwise the first request for the form would not be answered by MSW.
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
