import Footer from "../components/common/Footer.tsx";
import CostumeNavbar from "../components/common/navbar.tsx";
import Toast from "../components/common/CustomToast.tsx";
import '../design/pages/commingSoon.css';

export default function CoomingSoonPage() {
    return (
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main className="commingSoon">
                <h1 className="commingSoon">Az oldal még készítés alatt van</h1>
            </main>
            <footer>
                <Footer/>
            </footer>
            <Toast />
        </>
    );
}