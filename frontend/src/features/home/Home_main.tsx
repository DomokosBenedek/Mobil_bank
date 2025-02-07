import { placeholderHero_image, placeholderIcon, placeholderImage } from "../../components/common/img";
import "../../design/home_page_elements/advantages.css";
import "../../design/home_page_elements/contact.css";
import "../../design/home_page_elements/functions.css";
import "../../design/home_page_elements/howItWork.css";
import "../../design/home_page_elements/newsLetter.css";
import "../../design/home_page_elements/tryItOut.css";
import "../../design/home_page_elements/hero.css";

export function Hero() {  
  return(
    <section className="hero">
      <div className="hero-text">
        <h1 className="alter">Kövesd nyomon pénzügyeidet egyszerűen és gyorsan</h1>
        <p className="alter">
          Ez a mobilbanki alkalmazás lehetővé teszi, hogy könnyedén nyomon
          kövesd bevételeidet és kiadásaidat. Használatával egyszerűsítheted a
          pénzügyeid kezelését, és mindig tudni fogod, hol állsz anyagilag.
        </p>
        <div className="hero-buttons">
          <button className="secondary_v1">Tudj meg többet</button>
          <button className="secondary_v2">Regisztráció</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={placeholderHero_image} alt="Hero Illustration" />
      </div>
    </section>
  );
}

export function Functions() {  
  return (
    <section id="functions">
      <div className="functions-text">
        <h2>Fedezd fel a pénzügyeid világát!</h2>
        <p>
        Az alkalmazás lehetővé teszi a bevételeid és kiadásaid egyszerű nyomon követését. Intuitív felülete segít a pénzügyeid kezelésében, hogy mindig tisztában legyél a helyzeteddel.
        </p>
      </div>
      <div className="functions-cards">
        <div className="functions-card">
          <div className="functions-image">
            <img src={placeholderImage} alt="functions Illustration" />
          </div>
          <h4 className="functions-card-title">Bevételek és kiadások nyomon követése</h4>
          <p className="functions_card_text">Könnyedén rögzítheted és ellenőrizheted pénzügyeidet.</p>
        </div>
        <div className="functions-card">
          <div className="functions-image">
            <img src={placeholderImage} alt="functions Illustration" />
          </div>
          <h4 className="functions-card-title">Fizetések egyszerű kezelése</h4>
          <p className="functions_card_text">Az alkalmazás segítségével gyorsan intézheted a kifizetéseidet.</p>
        </div>
        <div className="functions-card">
          <div className="functions-image">
            <img src={placeholderImage} alt="functions Illustration" />
          </div>
          <h4 className="functions-card-title">Felhasználói adatbázis kezelése</h4>
          <p className="functions_card_text">Biztonságosan tárolhatod adataidat és tranzakcióidat.</p>
        </div>
      </div>
      <div className="functions-buttons">
        <button className="primary_v2">Tudj meg többet</button>
        <button className="primary_v3">Regisztráció</button>
      </div>
    </section>
  )
}
export function Advantages() {  
    return (
      <section id="advantages">

          <div className="advantages-content">
            {/* Advantages text */}
            <div className="advantages-text">
              <h2>Kövesd nyomon pénzügyeidet egyszerűen és gyorsan</h2>
              <p>
                Ez a mobilbanki alkalmazás lehetővé teszi, hogy könnyedén nyomon
                kövesd bevételeidet és kiadásaidat. Használatával egyszerűsítheted a
                pénzügyeid kezelését, és mindig tudni fogod, hol állsz anyagilag.
              </p>
            </div>

            {/* Advantages cards */}
            <div className="advantages-cards">
              <div className="advantages-card">
                <img src={placeholderIcon} alt="Advantages Icon" />
                <h6>Egyszerű kezelés</h6>
                <p>
                  A mobilbanki alkalmazásunk használata egyszerű és intuitív, így
                  bárki könnyedén használhatja.
                </p>
              </div>
              <div className="advantages-card">
                <img src={placeholderIcon} alt="Advantages Icon" />
                <h6>Átláthatóság</h6>
                <p>
                  Mindig tudni fogod, hogy mire költöttél, és mennyi pénzed maradt
                  a hónap végére.
                </p>
              </div>
              <div className="advantages-card">
                <img src={placeholderIcon} alt="Advantages Icon" />
                <h6>Automatizált folyamatok</h6>
                <p>
                  Állítsd be az alkalmazást, hogy automatikusan számolja ki a
                  bevételeidet és kiadásaidat.
                </p>
              </div>
            </div>
              
            {/* Advantages buttons */}
            <div className="advantages-buttons">
              <button className="primary_v2">Tudj meg többet</button>
              <button className="primary_v3">Regisztráció</button>
            </div>
          </div>
          
          {/* Advantages image */}
          <div className="advantages-image">
          <img src={placeholderImage} alt="Advantages Illustration" />
        </div>
      </section>
    )
}
export function TryItOut() {  
    return (
      <section id="tryItOut">
      <div className="tryItOut-object">
        <div className="tryItOut-text">
          <h2>Próbáld ki most az alkalmazást</h2>
          <p>
            Kövesd nyomon bevételeidet és kiadásaidat egyszerűen, bárhol és bármikor a mobil applikációnkkal.
          </p>
        </div>
        <div className="tryItOut-buttons">
          <button className="primary_v1">Belépés</button>
          <button className="primary_v2">Regisztráció</button>
        </div>
      </div>
      <div className="tryItOut-image">
        <img src={placeholderImage} alt="tryItOut Illustration" />
      </div>
    </section>
    )
}
export function HowItWork() {  
    return (
<section id="howItWork">
      {/*Cím*/}
      <div className="howItWork-text">
        <h3>Fedezd fel, hogyan segít a mobilbanki alkalmazás a pénzügyeid kezelésében!</h3>
      </div>

      {/*Kártyák*/}
      <div className="howItWork-cards">
        {/*1. Kártya*/}
        <div className="howItWork-card">
          {/*Ikon*/}
          <div className="howItWork-image">
            <img src={placeholderIcon} alt="Advantage Icon" />
          </div>
          {/*Szöveg*/}
          <div className="howItWork-card_text">
            <h5 className="howItWork-card-title">Könnyedén nyomon követheted bevételeidet és kiadásaidat egy helyen.</h5>
            <p className="howItWork_card_text">Az alkalmazás egyszerűen használható, és segít a pénzügyi döntéseidben.</p>
          </div>
          {/*Gomb*/}
          <div className="howItWork-buttons">
            <button className="primary_v3">Regisztráció</button>
          </div>
        </div>

        {/*2. Kártya*/}
        <div className="howItWork-card">
          {/*Ikon*/}
          <div className="howItWork-image">
            <img src={placeholderIcon} alt="Advantage Icon" />
          </div>
          {/*Szöveg*/}
          <div className="howItWork-card_text">
            <h5 className="howItWork-card-title">Indítsd el a pénzügyeid nyomon követését még ma!</h5>
            <p className="howItWork_card_text">Csatlakozz hozzánk, és tapasztald meg a pénzügyi kontroll előnyeit.</p>
          </div>
          {/*Gomb*/}
          <div className="howItWork-buttons">
            <button className="primary_v3">Regisztráció</button>
          </div>
        </div>

          {/*3. Kártya*/}
        <div className="howItWork-card">
          {/*Ikon*/}
          <div className="howItWork-image">
            <img src={placeholderIcon} alt="Advantage Icon" />
          </div>
          {/*Szöveg*/}
          <div className="howItWork-card_text">
            <h5 className="howItWork-card-title">Hozd létre a költségvetésed, és tartsd kézben a kiadásaidat!</h5>
            <p className="howItWork_card_text">Az alkalmazás lehetővé teszi a kiadások és bevételek egyszerű rögzítését.</p>
          </div>
          {/*Gomb*/}
          <div className="howItWork-buttons">
            <button className="primary_v3">Regisztráció</button>
          </div>
        </div>

      </div>
    </section>
    )
}
export function NewsLetter() {  
    return (
      <section id="newsLetter">
        <div className="newsLetter-container">
          <div className="newsLetter-title">
            <h2>Iratkozzon fel hírlevelünkre!</h2>
            <p>Legyen mindig naprakész az új funkciókról és frissítésekről szóló értesítéseinkkel!</p>
          </div>
          <div className="newsLetter-form-container">
            <form className="newsLetter-form">
              <input type="email" placeholder="Email cím" />
              <button className="primary_v1">Feliratkozás</button>
            </form>
            <p className="tiny">By clicking Sign Up you're confirming that you agree with our Terms and Conditions.</p>
          </div>
        </div>
        <div className="newsLetter-image">
          <img src={placeholderImage} alt="newsLetter Illustration" />
        </div>
    </section>
    )
}
export function Contact() {  
  return (
    <section id="contact">
      <div className="contact-title">
        <h2>Lépjen kapcsolatba</h2>
        <p>Kérdéseivel keressen minket bizalommal!</p>
      </div>
      <div className="contact-text">
        <div className="contact-List">
          <div className="contact-object">
            <img src={placeholderIcon} alt="Email Icon" />
            <div className="contact-object-text">
              <h6>Email</h6>
              <p>Írjon nekünk bátran!</p>
              <p><u>hello@relume.io</u></p>
            </div>
          </div>
          <div className="contact-object">
            <img src={placeholderIcon} alt="Telefon Icon" />
            <div className="contact-object-text">
              <h6>Telefon</h6>
              <p>Hívjon minket!</p>
              <p><u>+1 (555) 000-0000</u></p>
            </div>
          </div>
          <div className="contact-object">
            <img src={placeholderIcon} alt="Iroda Icon" />
            <div className="contact-object-text">
              <h6>Iroda</h6>
              <p>Keressen fel személyesen!</p>
              <p>123 Minta utca, Sydney NSW 2000 AU</p>
            </div>
          </div>
        </div> 
        <div className="contact-image">
          <img src={placeholderImage} alt="Contact Illustration" />
        </div>
      </div>
    </section>
  )
}

