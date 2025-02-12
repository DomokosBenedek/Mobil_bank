import { NavLink } from "react-router-dom";
import { placeholderCard, placeholderIcon } from "../../components/common/img";
import "../../design/profil_page_element/Sidebar.css";
import { logicks } from "../../components/common/logic";

const Sidebar: React.FC = () => {
    const { user, activeAccount } = logicks();
    const {
      logout,
    } = logicks();
  return (
    <nav className="sidebar">
      <ul className="nav-links">
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/card`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Kártyák
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/charts`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Diagramok
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/profil`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Profil
          </NavLink>
        </li>
        <li>
          <NavLink to={`/profile/${user?.firstName}${user?.lastName}/changes`} className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Changes
          </NavLink>
        </li>
      </ul>
      <img src={placeholderCard} alt="Card image" className="sidebar-image-container"/>
      <div className="sidebar-footer">
        <div className="logout" onClick={logout}>
          <img src={placeholderIcon} alt="icon"/> Logout
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;