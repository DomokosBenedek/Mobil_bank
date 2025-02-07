import { NavLink } from "react-router-dom";
import { placeholderCard, placeholderIcon } from "../../components/common/img";
import "../../design/profil_page_element/Sidebar.css";
import Card from "../../components/common/Card";

export default function Sidebar() {
  const activeAccount = JSON.parse(localStorage.getItem("activeAccount") || '{}');
  return (
    <nav className="sidebar">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Áttekintés
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/cards" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Kártyák
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/charts" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Diagramok
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Beállítások
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/changes" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Changes
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={placeholderIcon} alt="icon"/> Settings
          </NavLink>
        </li>
      </ul>
      <img src={placeholderCard} alt="" className="sidebar-image-container"/>
      {/*
      <div style={{backgroundImage: `url(${placeholderCard})`}} className="sidebar-image-container">
        <Card
          id={'*'.repeat(activeAccount.id.length - 4) + activeAccount.id.slice(-4)}
          number={activeAccount.number}
          total={activeAccount.total || 0}
          currency={activeAccount.currency || "N/A"}
          name={`${activeAccount.firstName} ${activeAccount.lastName}`}
          date={new Date(activeAccount.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
        />
      </div>
      */}
      <div className="sidebar-footer">
        <NavLink to="/logout" className="logout">
          <img src={placeholderIcon} alt="icon"/> Logout
        </NavLink>
      </div>
    </nav>
  );
}