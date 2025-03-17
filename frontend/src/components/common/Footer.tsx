import React from 'react';
import { NavLink } from 'react-router-dom';
import { placeholderIcon_text, Icon_mail, Icon_phone, Icon_location } from './img';
import '../../design/common/footer.css';
import { logicks } from './logic';

const Footer = () => {
    const { user } = logicks();

    console.log(user);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={placeholderIcon_text} alt="Logo" />
          <div className="footer-contacts">
            <div>
              <img src={Icon_mail} alt="Email" />
              <span>hello@relume.io</span>
            </div>
            <div>
              <img src={Icon_phone} alt="Phone" />
              <span>+1 (555) 000-0000</span>
            </div>
            <div>
              <img src={Icon_location} alt="Office" />
              <span>123 Minta utca, Sydney NSW 2000 AU</span>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <div className="links-column">
            <p>Home oldal:</p>
            <a href="/#functions">Funkciók</a>
            <a href="/#advantages">Előnyök</a>
            <a href="/#tryItOut">Próbáld ki</a>
            <a href="/#howItWork">Hogyan működik</a>
            <a href="/#newsLetter">Hírlevél</a>
            <a href="/#contact">Kapcsolatok</a>
          </div>
          <div className="links-column">
            <p>Funkciók:</p>
            <a href="/changes">Árfolyamok</a>
            <a href="/downloads">Letöltések</a>
          </div>
          <div className="links-column">
            <p>Profil oldal:</p>
            <NavLink to={`/profile/${user?.firstName}${user?.lastName}/dashboard`}>Home</NavLink>
            <NavLink to={`/profile/${user?.firstName}${user?.lastName}/card`}>Számla</NavLink>
            <NavLink to={`/profile/${user?.firstName}${user?.lastName}/profil`}>Profil</NavLink>
          </div>
          <div className="links-column">
            <p>Készítők:</p>
            <a href="#">Varga Dávid Zoltán</a>
            <a href="#">Borbély Dániel</a>
            <a href="#">Domokos Benedek</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;