import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon_Card, Icon_Chart, Icon_Euro, Icon_Home, Icon_Logout, Icon_Profil, placeholderCard } from "../../common/img";
import "../../../design/profil_page_element/sidebar.css";
import { logicks } from "../../common/logic";

const Sidebar: React.FC = () => {
    const { user, activeAccount } = logicks();
    const { logout } = logicks();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav 
            className={`sidebar ${isHovered ? "hovered" : ""}`} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
        >
            <ul className="nav-links">
                <li>
                    <NavLink to={`/profile/${user?.firstName}${user?.lastName}/dashboard`} className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src={Icon_Home} alt="icon"/> <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${user?.firstName}${user?.lastName}/card`} className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src={Icon_Card} alt="icon"/> <span>Kártyák</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${user?.firstName}${user?.lastName}/charts`} className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src={Icon_Chart} alt="icon"/> <span>Diagramok</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${user?.firstName}${user?.lastName}/profil`} className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src={Icon_Profil} alt="icon"/> <span>Profil</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/profile/${user?.firstName}${user?.lastName}/changes`} className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src={Icon_Euro} alt="icon"/> <span>Changes</span>
                    </NavLink>
                </li>
            </ul>
            <img src={placeholderCard} alt="Card image" className="sidebar-image"/>
            <div className="sidebar-footer">
                <div className="logout" onClick={logout}>
                    <img src={Icon_Logout} alt="icon"/> <span>Logout</span>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;