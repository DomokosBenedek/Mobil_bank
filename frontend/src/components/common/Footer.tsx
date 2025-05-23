import React from 'react';
import { NavLink } from 'react-router-dom';
import { placeholderIcon_text, Icon_mail, Icon_phone, Icon_location } from './img';
import '../../design/common/footer.scss';
import { logicks } from './logic';

const Footer = () => {
    const { user } = logicks();


    console.log(user);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <div className="footer-logo-icon">
            <img src={placeholderIcon_text} alt="Logo" />
          </div>
          <div className="footer-contacts">
            <div className="contact-item">
              <img src={Icon_mail} alt="Email" />
              <p>hello@relume.io</p>
            </div>
            <div className="contact-item">
              <img src={Icon_phone} alt="Phone" />
              <p>+1 (555) 000-0000</p>
            </div>
            <div className="contact-item">
              <img src={Icon_location} alt="Office" />
              <p>123 Minta utca, Sydney NSW 2000 AU</p>
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
            <a href="/commingSoon">Letöltések</a>
          </div>
          <div className="links-column">
            <p>Készítők:</p>
            <a href="/commingSoon">Varga Dávid Zoltán</a>
            <a href="/commingSoon">Borbély Dániel</a>
            <a href="/commingSoon">Domokos Benedek</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;