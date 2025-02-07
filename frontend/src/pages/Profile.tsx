import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Dashboard_page from '../features/profil/dashboars';
import Card_Page from '../features/profil/Card';
import Charts_Page from '../features/profil/stats';
//import Test from './components/test'

const Profile: React.FC = () => {
  return (
    <div className="profile-layout">
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard_page />} />
          <Route path="cards" element={<Card_Page />} />
          <Route path="charts" element={<Charts_Page />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;