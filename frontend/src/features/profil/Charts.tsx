import CostumeNavbar from "../../components/common/navbar";
import { Account } from "../../Props/AccountProp";
import { User } from "../../Props/UserProp";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Card from "../../components/common/Card";
import { Card_newCard } from "../../components/common/img";
import Footer from "../../components/common/Footer";
import PieChart from '../../components/common/charts/pieChart';
import BarChart from '../../components/common/charts/barChart';

const Charts_Page: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userID] = useState<string | null>(localStorage.getItem('UserId'));
  const [userToken] = useState<string | null>(localStorage.getItem('Token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/accounts/all/${userID}`, {
          method: 'GET',
          headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + userToken,
          }
        });
        if (!response.ok) throw new Error('Failed to fetch accounts');
        const data = await response.json();
        setUser(prevUser => prevUser ? { ...prevUser, Accounts: data } : null);
        
        const storedActiveAccountId = localStorage.getItem('activeAccountId');
        if (data.length > 0) {
          const selectedAccount = data.find((acc: Account) => acc.id === storedActiveAccountId) || data[0];
          setActiveAccount(selectedAccount);
          localStorage.setItem('activeAccountId', selectedAccount.id);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userID, userToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <header><CostumeNavbar /></header>
      <main className="profile-container">
        <Sidebar/>
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
                  <div key={account.id} className={`card ${isActive ? 'active' : ''}`} onClick={() => setActiveAccount(account)}>
                    <Card
                      id={account.id}
                      number={index + 1}
                      total={account.total || 0}
                      currency={account.currency || "N/A"}
                      name={`${user.firstName} ${user.lastName}`}
                      date={new Date(account.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
                    />
                  </div>
                );
              })}
              <img src={Card_newCard} alt="NewCard" />
            </div>
          </div>
        </section>
        <section className="transactions-section">
          <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <BarChart key={activeAccount?.id} />
          </div>
        </section>
        <section className="diagram-section">
          <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <PieChart key={activeAccount?.id} />
          </div>   
        </section>
      </main>
      <footer><Footer /></footer>
    </>
  );
};

export default Charts_Page;