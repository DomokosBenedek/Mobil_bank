import { Route, Routes } from 'react-router-dom';
import Card_Page from '../components/features/profil/Card';
import Charts_Page from '../components/features/profil/Charts';
import Dashboard_Page from '../components/features/profil/Dashboars';
import Profil_Page from '../components/features/profil/Profil';
import { logicks } from '../components/common/logic';
import Changes_Page from '../components/features/profil/Changes';
import CostumeNavbar from '../components/common/navbar';
import Footer from '../components/common/Footer';
import Sidebar from '../components/features/profil/Sidebar';

const Profile: React.FC = () => {
  const { user } = logicks();

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();
  return (
    <>
      <header>
        <CostumeNavbar />
      </header>
      <main>
        <Sidebar />
        <div className="profile-layout">
          <Routes>
            <Route path={`/dashboard`} element={<Dashboard_Page />} />
            <Route path={`/card`} element={<Card_Page />} />
            <Route path={`/charts`} element={<Charts_Page />} />
            <Route path={`/profil`} element={<Profil_Page />} />
            <Route path={`/changes`} element={<Changes_Page />} />
          </Routes>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Profile;