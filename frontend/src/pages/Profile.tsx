import {Route, Routes} from 'react-router-dom'
import Card_Page from '../features/profil/Card';
import Charts_Page from '../features/profil/stats';
import Dashboard_Page from '../features/profil/Dashboars';

const Profile: React.FC = () => {
  return (
    <div className="profile-layout">
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard_Page />} />
          <Route path="cards" element={<Card_Page />} />
          <Route path="charts" element={<Charts_Page />} />
        </Routes>
      </div>
    </div>
  );
}

export default Profile;