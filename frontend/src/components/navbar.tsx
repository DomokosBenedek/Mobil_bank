import LoginDropdown from "./LoginDropdown";
import '../design/navbar.css';

export default function CostumeNavbar() {
    return (
      <nav className="navbar">
        {/* Bal oldalon a logó */}
        <div className="logo" onClick={() => window.location.href = "/"}>
          <img src="/path/to/logo.png" alt="Logo" className="logo-image" />
        </div>
  
        {/* Középen a linkek */}
        <ul className="nav-links">
          <li className="nav-item"><a href="#functions" className="nav-link">Funkciók</a></li>
          <li className="nav-item"><a href="#advantages" className="nav-link">Előnyök</a></li>
          <li className="nav-item"><a href="#tryItOut" className="nav-link">Próbáld ki</a></li>
          <li className="nav-item"><a href="#howItWork" className="nav-link">Hogyan működik</a></li>
          <li className="nav-item"><a href="#newsLetter" className="nav-link">Hírlevél</a></li>
          <li className="nav-item"><a href="#contact" className="nav-link">Kapcsolatok</a></li>
        </ul>
  
        {/* Jobb oldalon a login */}
        <div className="login">
          <LoginDropdown/>
        </div>
      </nav>
    );
  }