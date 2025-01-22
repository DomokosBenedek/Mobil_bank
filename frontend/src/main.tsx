import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import HomePage from './components/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage/>
  </StrictMode>,
)
