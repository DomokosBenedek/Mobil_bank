import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import HomePage from './pages/home';
import Regist from './pages/regist';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Changes from './pages/Changes';
import CoomingSoonPage from './pages/CommingSoon';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Regist" element={<Regist />} />
      <Route path="/profile/:username/*" element={<Profile />} />
      <Route path="/changes" element={<Changes />} />
      <Route path="/commingSoon" element={<CoomingSoonPage />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);