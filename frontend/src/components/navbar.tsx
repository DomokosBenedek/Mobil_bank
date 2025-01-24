import LoginDropdown from "./LoginDropdown";
import '../design/navbar.css';

export default function CostumeNavbar() {
    return (
      <nav className="navbar">
        {/* Bal oldalon a logó */}
        <div className="logo">
          <img src="/path/to/logo.png" alt="Logo" className="logo-image" />
        </div>
  
        {/* Középen a linkek */}
        <ul className="nav-links">
          <li className="nav-item"><a href="#features" className="nav-link">Funkciók</a></li>
          <li className="nav-item"><a href="#benefits" className="nav-link">Előnyök</a></li>
          <li className="nav-item"><a href="#try" className="nav-link">Próbáld ki</a></li>
          <li className="nav-item"><a href="#how-it-works" className="nav-link">Hogyan működik</a></li>
          <li className="nav-item"><a href="#newsletter" className="nav-link">Hírlevél</a></li>
          <li className="nav-item"><a href="#contacts" className="nav-link">Kapcsolatok</a></li>
        </ul>
  
        {/* Jobb oldalon a login */}
        <div className="login">
          <LoginDropdown/>
        </div>
      </nav>
    );
  }