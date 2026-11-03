import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initMotionClass } from './hooks/motion'
import './index.css'

initMotionClass()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
