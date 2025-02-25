import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import HomePage from './pages/home';
import Profile_List from './pages/Profile_List';
import Regist from './pages/regist';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Changes_Page from './components/features/profil/Changes';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<Profile_List />} />
      <Route path="/Regist" element={<Regist />} />
      <Route path="/profile/:username/*" element={<Profile />} />
      <Route path="/changes" element={<Changes_Page />} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);