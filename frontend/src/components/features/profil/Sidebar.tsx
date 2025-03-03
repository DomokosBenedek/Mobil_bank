import { NavLink } from "react-router-dom";
import { Icon_Card, Icon_Chart, Icon_Euro, Icon_Home, Icon_Logout, Icon_Profil, placeholderCard, placeholderIcon } from "../../common/img";
import "../../../design/profil_page_element/sidebar.css";
import { logicks } from "../../common/logic";

const Sidebar: React.FC = () => {
    const { user, activeAccount } = logicks();
    const {
      logout,
    } = logicks();
  return (
    <nav className="sidebar">
      <ul className="nav-links">
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/dashboard`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Home} alt="icon"/> Home
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/card`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Card} alt="icon"/> Kártyák
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/charts`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Chart} alt="icon"/> Diagramok
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/profil`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Profil} alt="icon"/> Profil
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/changes`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={Icon_Euro} alt="icon"/> Changes
          </NavLink>
        </li>
      </ul>
      <img src={placeholderCard} alt="Card image" className="sidebar-image-container"/>
      <div className="sidebar-footer">
        <div className="logout" onClick={logout}>
          <img src={Icon_Logout} alt="icon"/> Logout
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;