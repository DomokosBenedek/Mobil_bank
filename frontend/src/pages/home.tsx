import Footer from "../components/common/Footer.tsx";
import { Hero, Functions, Advantages, TryItOut, HowItWork, NewsLetter, Contact } from "../components/features/home/Home_main.tsx";
import CostumeNavbar from "../components/common/navbar.tsx";
import Toast from "../components/common/CustomToast.tsx";


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
                <HowItWork/>
                <TryItOut/>
                <NewsLetter/>
                <Contact/>
            </main>
            <footer>
                <Footer/>
            </footer>
            <Toast />
        </>
    );
}