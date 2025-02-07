import { matchPath, useLocation } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import "../../design/common/navbar.css";
import { placeholderIcon_text } from "./img";

export default function CostumeNavbar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const pageTitles: Record<string, string> = {
      "/regist": "Registráció"
    };

  // Ellenőrizzük, hogy az útvonal egy dinamikus profil oldal-e
  let currentPageTitle = pageTitles[location.pathname] || "";

  if (matchPath("/profile/:username", location.pathname)) {
      currentPageTitle = "Profil";
  }

    return (
      <nav className="navbar">
        {/* Bal oldalon a logó */}
        <div className="logo" onClick={() => window.location.href = "/"}>
          <img src={placeholderIcon_text} alt="Logo" className="logo-image" />
        </div>

        {isHomePage ? (
          // Ha a kezdőlapon vagyunk, jelenjen meg az összes link
          <ul className="nav-links">
            <li className="nav-item"><a href="#functions" className="nav-link">Funkciók</a></li>
            <li className="nav-item"><a href="#advantages" className="nav-link">Előnyök</a></li>
            <li className="nav-item"><a href="#tryItOut" className="nav-link">Próbáld ki</a></li>
            <li className="nav-item"><a href="#howItWork" className="nav-link">Hogyan működik</a></li>
            <li className="nav-item"><a href="#newsLetter" className="nav-link">Hírlevél</a></li>
            <li className="nav-item"><a href="#contact" className="nav-link">Kapcsolatok</a></li>
          </ul>
        ) : (
          // Ha másik oldalon vagyunk, jelenjen meg az oldal címe középen
          <div className="page-title">{currentPageTitle}</div>
        )}

        {/* Jobb oldalon a login */}
        <div className="login">
          <LoginDropdown/>
        </div>
      </nav>
    );
}
