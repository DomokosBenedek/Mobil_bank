import CostumeNavbar from "../../components/common/navbar";
import Sidebar from "./Sidebar";
import Card from "../../components/common/Card";
import { Card_newCard } from "../../components/common/img";
import Footer from "../../components/common/Footer";
import { logicks } from "./logic";
import "../../design/profil_page_element/dashboard.css";

const Dashboard_Page: React.FC = () => {
  const { user, loading, error, activeAccount, handleCardClick, addNewAccount } = logicks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header><CostumeNavbar /></header>
      <main className="profile-container">
        <div id='sidebar'>
          <Sidebar/>
        </div>
        <section className="cards-section">
          <div className="Title_row">
            <h3 className="Title">Cards</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <div className='cardList'>
              {user?.Accounts?.map((account, index) => {
                const isActive = activeAccount?.id === account.id;
                return (
                  <div key={account.id} className={`card ${isActive ? 'active' : ''}`} onClick={() => handleCardClick(account)}>
                    <Card
                      id={'*'.repeat(account.id.length - 4) + account.id.slice(-4)}
                      number={index + 1}
                      total={account.total || 0}
                      currency={account.currency || "N/A"}
                      name={`${user.firstName} ${user.lastName}`}
                      date={new Date(account.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
                    />
                  </div>
                );
              })}
                <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />
            </div>
          </div>
        </section>
        <section className="transactions-section">
          <div className="Title_row">
            <h3 className="Title">Transactions</h3>
            <button className="primary_v3">View more</button>
          </div>
        </section>
        <section className="diagram-section">
          <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
        </section>
      </main>
      <footer><Footer /></footer>
    </>
  );
};

export default Dashboard_Page;
