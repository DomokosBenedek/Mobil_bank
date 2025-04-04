import { NavLink } from "react-router-dom";
import { Icon_Card, Icon_Euro, Icon_Home, Icon_Logout, Icon_Profil } from "../../common/img";
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
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/dashboard`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Home} alt="icon" />
            {isExpanded && <span>Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/card`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Card} alt="icon" />
            {isExpanded && <span>Számla</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/profil`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Profil} alt="icon" />
            {isExpanded && <span>Profil</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/changes`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Euro} alt="icon" />
            {isExpanded && <span>Árfolyamok</span>}
          </NavLink>
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