import Footer from "./Footer";
import { Hero,Functions, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "./Home_main";
import CostumeNavbar from "./navbar";
import '../design/navbar.css';
import '../design/LoginDropdown.css';
import '../design/hero.css';
import '../design/footer.css';
<<<<<<< HEAD
<<<<<<< HEAD
import '../design/functions.css';
=======
import '../functions.css';
>>>>>>> 3698a5e78d7d73f2d042c0446907e5f8c6d4269c
=======
import '../functions.css';
>>>>>>> 3698a5e78d7d73f2d042c0446907e5f8c6d4269c


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