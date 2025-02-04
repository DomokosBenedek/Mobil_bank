import { NavLink } from "react-router-dom";
import "../design/sidebar.css";
import placeholderImage from "../assets/sidebar-image.png";
import { placeholderCard, placeholderIcon } from "./img";

export default function Sidebar() {
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
          <img src={placeholderIcon} alt="icon"/> Profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/cards" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src={placeholderIcon} alt="icon"/> Cards
          </NavLink>
        </li>
        <li>
          <NavLink to="/categories" className={({ isActive }) => (isActive ? "active" : "")}>
          <img src={placeholderIcon} alt="icon"/> Categories
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
        <img src={placeholderCard} alt="Sidebar Illustration" className="sidebar-image" />
      <div className="sidebar-footer">
        <NavLink to="/logout" className="logout">
        <img src={placeholderIcon} alt="icon"/> Logout
        </NavLink>
      </div>
    </nav>
  );
}