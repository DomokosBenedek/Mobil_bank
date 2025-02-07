import Footer from "../components/common/Footer.tsx";
import { Hero,Functions, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "../features/home/Home_main.tsx";
import CostumeNavbar from "../components/common/navbar.tsx";

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