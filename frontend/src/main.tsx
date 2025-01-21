import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './footer.css'
import './navbar.css'
import './hero.css'
import './LoginDropdown.css'
import './Advantages.css'
import HomePage from './components/home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomePage/>
  </StrictMode>,
)
