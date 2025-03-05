import { matchPath, useLocation } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import "../../design/common/navbar.css";
import { placeholderIcon_text } from "./img";
import { logicks } from "./logic";

export default function CostumeNavbar() {
    const location = useLocation();
    const { user } = logicks();
    const isHomePage = location.pathname === "/";

    const pageTitles: Record<string, string> = {
      "/regist": "Registráció"
    };

  // Ellenőrizzük, hogy az útvonal egy dinamikus profil oldal-e
  let currentPageTitle = pageTitles[location.pathname] || "";

  if (matchPath(`/profile/${user?.firstName}${user?.lastName}/dashboard`, location.pathname)) {
      currentPageTitle = "Dashboard";
  }
  if (matchPath(`/profile/${user?.firstName}${user?.lastName}/Card`, location.pathname)) {
    currentPageTitle = "Card";
  }
  if (matchPath(`/profile/${user?.firstName}${user?.lastName}/Charts`, location.pathname)) {
    currentPageTitle = "Charts";
  }
  if (matchPath(`/profile/${user?.firstName}${user?.lastName}/Profil`, location.pathname)) {
    currentPageTitle = "Profil";
  }
  if (matchPath(`/profile/${user?.firstName}${user?.lastName}/Changes`, location.pathname)) {
    currentPageTitle = "Changes";
  }
  if (matchPath(`/Changes`, location.pathname)) {
    currentPageTitle = "Changes";
  }

    return (
      <nav className="navbar">
        {/* Bal oldalon a logó */}
        <div className="navbar-logo" onClick={() => window.location.href = "/"}>
          <img src={placeholderIcon_text} alt="Logo" className="navbar-logo-image" />
        </div>

        {isHomePage ? (
          // Ha a kezdőlapon vagyunk, jelenjen meg az összes link
          <ul className="navbar-nav-links">
            <li className="navbar-nav-item"><a href="#functions" className="navbar-nav-link">Funkciók</a></li>
            <li className="navbar-nav-item"><a href="#advantages" className="navbar-nav-link">Előnyök</a></li>
            <li className="navbar-nav-item"><a href="#tryItOut" className="navbar-nav-link">Próbáld ki</a></li>
            <li className="navbar-nav-item"><a href="#howItWork" className="navbar-nav-link">Hogyan működik</a></li>
            <li className="navbar-nav-item"><a href="#newsLetter" className="navbar-nav-link">Hírlevél</a></li>
            <li className="navbar-nav-item"><a href="#contact" className="navbar-nav-link">Kapcsolatok</a></li>
            <li className="navbar-nav-item"><a href="changes" className="navbar-nav-link">Changes</a></li>
          </ul>
        ) : (
          // Ha másik oldalon vagyunk, jelenjen meg az oldal címe középen
          <div className="navbar-page-title">{currentPageTitle}</div>
        )}

        {/* Jobb oldalon a login */}
        <div className="navbar-login">
          <LoginDropdown/>
        </div>
      </nav>
    );
}