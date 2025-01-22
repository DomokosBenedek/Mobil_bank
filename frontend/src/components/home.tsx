import Footer from "./Footer";
import { Hero,Functions, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "./Home_main";
import CostumeNavbar from "./Navbar";
import '../design/navbar.css';
import '../design/LoginDropdown.css';
import '../design/hero.css';
import '../design/footer.css';
import '../design/functions.css';
import '../design/advantages.css';
import '../design/tryItOut.css';
import '../design/howItWork.css';
import '../design/newsLetter.css';

export default function HomePage() {
    return (
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main>
                <Hero/>
                <Functions/>
                <Advantages/>
                <TryItOut/>
                <HowItWork/>
                <NewsLetter/>
                <Contact/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
}