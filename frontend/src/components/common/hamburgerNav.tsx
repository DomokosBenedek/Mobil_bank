import { useState } from "react";
import "../../design/common/hamburgerNav.scss";
import { Hamburger_Orange } from "./img";

export default function HamburgerNav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hamburger-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="hamburger-icon">
        <img src={Hamburger_Orange} alt="HMBR" />
      </div>
      {isHovered && (
        <div className="hamburger-dropdown">
          <ul>
            <li><a href="#functions">Funkciók</a></li>
            <li><a href="#advantages">Előnyök</a></li>
            <li><a href="#tryItOut">Próbáld ki</a></li>
            <li><a href="#howItWork">Hogyan működik</a></li>
            <li><a href="#newsLetter">Hírlevél</a></li>
            <li><a href="#contact">Kapcsolatok</a></li>
            <li><a href="changes">Árfolyamok</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}