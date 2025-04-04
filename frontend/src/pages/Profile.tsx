import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Card_Page from '../components/features/profil/Card';
import Charts_Page from '../components/features/profil/Charts';
import Dashboard_Page from '../components/features/profil/Dashboars';
import Profil_Page from '../components/features/profil/Profil';
import { logicks } from '../components/common/logic';
import Changes_Page from '../components/features/profil/Changes';
import CostumeNavbar from '../components/common/navbar';
import Sidebar from '../components/features/profil/Sidebar';
import '../design/pages/profil_page.scss';

const Profile: React.FC = () => {
  const { user } = logicks();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // Alapértelmezett nagy sidebár betöltéskor
  const [loading, setLoading] = useState(true); // Betöltési állapot
  const location = useLocation(); // React Router hook az útvonal figyeléséhez

  const handleSidebarToggle = () => {
    setIsSidebarExpanded((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarExpanded', JSON.stringify(newState)); // Mentés a localStorage-be
      return newState;
    });
  };

  useEffect(() => {
    // Ellenőrizzük a felhasználó korábbi preferenciáját a betöltés után
    const savedSidebarState = localStorage.getItem('sidebarExpanded');
    if (savedSidebarState !== null) {
      setIsSidebarExpanded(JSON.parse(savedSidebarState));
    }
    setLoading(false); // Betöltés vége
  }, []); // Csak egyszer fut le, amikor a komponens betöltődik

  useEffect(() => {
    // Útvonal változáskor loader megjelenítése
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Szimulált betöltési idő
    return () => clearTimeout(timer);
  }, [location]);

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();

  return (
    <>
      <header>
        <CostumeNavbar />
      </header>
      <main className="profile-main">
        <Sidebar isExpanded={isSidebarExpanded} onToggle={handleSidebarToggle} />
        <div className="profile-content">
          <div className="profile-main-content">
            {loading ? (
              // Betöltési animáció csak a fő tartalom helyett
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <Routes>
                <Route path={`/dashboard`} element={<Dashboard_Page />} />
                <Route path={`/card`} element={<Card_Page />} />
                <Route path={`/charts`} element={<Charts_Page />} />
                <Route path={`/profil`} element={<Profil_Page />} />
                <Route path={`/changes`} element={<Changes_Page />} />
              </Routes>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;