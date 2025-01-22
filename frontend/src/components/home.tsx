import Footer from "./Footer";
import { Hero,Function, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "./Home_main";
import CostumeNavbar from "./navbar";
import '../design/navbar.css';
import '../design/LoginDropdown.css';
import '../design/hero.css';
import '../design/footer.css';


export default function HomePage() {
    return (
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main>
                <Hero/>
                <Function/>
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