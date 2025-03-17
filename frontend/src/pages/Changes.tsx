import CostumeNavbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import Changes_Page from "../components/features/profil/Changes";
import "../design/pages/Changes.css";

const Changes = () => {
  return (
    <>
      <header className="changes-header">
        <CostumeNavbar />
      </header>
      <main className="changes-main">
        <Changes_Page />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Changes;