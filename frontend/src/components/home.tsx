import Footer from "./Footer";
import { Hero,Functions, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "./Home_main";
import CostumeNavbar from "./navbar";


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