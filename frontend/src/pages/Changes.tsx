import "../design/profil_page_element/changes.css";
import CostumeNavbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import Changes_Page from "../components/features/profil/Changes";


const Changes = () => {

  return (
    <>
    <header>
      <CostumeNavbar/>
    </header>
      <main className="profile-main-changes">
        <Changes_Page/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Changes;