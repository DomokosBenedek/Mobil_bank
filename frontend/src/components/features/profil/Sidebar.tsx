import { NavLink } from "react-router-dom";
import { Icon_Card, Icon_Card_White, Icon_Euro, Icon_Euro_White, Icon_Home, Icon_Home_White, Icon_Logout, Icon_Profil, Icon_Profil_White } from "../../common/img";
import { logicks } from "../../common/logic";
import "../../../design/profil_page_element/sidebar.scss";

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, onToggle }) => {
  const { user, activeAccount, SetActiveAcountClick } = logicks();
  const { logout } = logicks();

  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="sidebar-toggle" onClick={onToggle}>
        {isExpanded ? "<<" : ">>"}
      </button>
      <ul className="nav-links">
  <li>
    <NavLink
      to={`/profile/${user?.firstName}${user?.lastName}/dashboard`}
      children={({ isActive }) => (
        <>
          <img src={isActive ? Icon_Home_White : Icon_Home} alt="icon" />
          {isExpanded && <span>Home</span>}
        </>
      )}
    />
  </li>
  <li>
    <NavLink
      to={`/profile/${user?.firstName}${user?.lastName}/card`}
      children={({ isActive }) => (
        <>
          <img src={isActive ? Icon_Card_White : Icon_Card} alt="icon" />
          {isExpanded && <span>Számla</span>}
        </>
      )}
    />
  </li>
  <li>
    <NavLink
      to={`/profile/${user?.firstName}${user?.lastName}/profil`}
      children={({ isActive }) => (
        <>
          <img src={isActive ? Icon_Profil_White : Icon_Profil} alt="icon" />
          {isExpanded && <span>Profil</span>}
        </>
      )}
    />
  </li>
  <li>
    <NavLink
      to={`/profile/${user?.firstName}${user?.lastName}/changes`}
      children={({ isActive }) => (
        <>
          <img src={isActive ? Icon_Euro_White : Icon_Euro} alt="icon" />
          {isExpanded && <span>Árfolyamok</span>}
        </>
      )}
    />
  </li>
</ul>
      <div className="sidebar-logout">
        <div className="logout" onClick={logout}>
          <img src={Icon_Logout} alt="icon" />
          {isExpanded && <span>Kilépés</span>}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;