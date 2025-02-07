import CostumeNavbar from "../../components/common/navbar";
import { Account } from "../../Props/AccountProp";
import { User } from "../../Props/UserProp";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Card from "../../components/common/Card";
import { Card_newCard } from "../../components/common/img";
import Footer from "../../components/common/Footer";
import "../../design/profil_page_element/dashboard.css";

const Dashboard_Page: React.FC = () => {
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

  const addNewAccount = async () => {
    console.log(userToken);
    console.log(userID);
    console.log(user);
    try {
      const response = await fetch(`http://localhost:3000/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({
          userId: userID,
          total: 0,
          currency: "HUF",
          ownerName: user?.firstName + " " + user?.lastName,
        }),
      });
      if (!response.ok) throw new Error("Failed to create account");
      const newAccount = await response.json();
      setUser((prevUser) =>
        prevUser ? { ...prevUser, Accounts: [...(prevUser.Accounts || []), newAccount] } : null
      );
    } catch (error) {
      setError((error as Error).message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCardClick = (account: Account) => {
    setActiveAccount(account);
    localStorage.setItem('activeAccountId', account.id);
  };

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
              {user?.Accounts?.map((account: Account, index) => {
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
            <img src={Card_newCard} alt="NewCard"/>
            </div>
          </div>
        </section>
        {/* Transactions Section */}
        <section className="transactions-section">
          <div className="Title_row">
            <h3 className="Title">Transactions</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</p>
          <p><strong>Updated At:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}</p>
          <p><strong>Account IDs:</strong></p>
          <ul>
            {user.accountId?.map((accountId) => ( 
                <li key={accountId as React.Key}>{accountId}</li>
            ))}
            </ul>
        </div>
        ) : (
        <p>No user data available.</p>
        )}</div>
    </section>
    {/* Diagram Section */}
    <section className="diagram-section">
        <div className="Title_row">
            <h3 className="Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
        </div>
        <div className="sectionMain"></div>   
    </section>
      </main>
      <footer><Footer /></footer>
    </>
  );
};

export default Dashboard_Page;
