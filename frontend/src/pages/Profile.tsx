import { Route, Routes } from 'react-router-dom';
import Card_Page from '../features/profil/Card';
import Charts_Page from '../features/profil/Charts';
import Dashboard_Page from '../features/profil/Dashboars';
import Profil_Page from '../features/profil/Profil';
import { logicks } from '../components/common/logic';
import Changes_Page from '../features/profil/Changes';

const Profile: React.FC = () => {
  const { user } = logicks();

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();
  console.log(userName);

  return (
    <>
        <div className="profile-layout">
          <Routes>
            <Route path="/" element={<Dashboard_Page/>} />
            <Route path={`/dashboard`} element={<Dashboard_Page />} />
            <Route path={`/card`} element={<Card_Page />} />
            <Route path={`/charts`} element={<Charts_Page />} />
            <Route path={`/profil`} element={<Profil_Page />} />
            <Route path={`/changes`} element={<Changes_Page />} />
          </Routes>
        </div>
    </>
  );
};

export default Profile;