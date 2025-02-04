import React, { useEffect, useState } from 'react';
import { User } from '../UserProp';
import Footer from './Footer';
import CostumeNavbar from './navbar';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import "../design/profil.css";
import Card from './test';

const Profil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { state } = useLocation();
  const { user: stateUser } = state || { user: null };

  useEffect(() => {
    if (stateUser) {
      setUser(stateUser);
      setLoading(false);
    } else {
      setError('No user data available in state');
      setLoading(false);
    }
  }, [stateUser]);

  console.log(user + " megérkezett")

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <header>
        <CostumeNavbar />
      </header>
      <main className="profile-container">
        {/* Sidebar */}
        <div id='sidebar'>
          <Sidebar/>
        </div>
        
        {/* Cards Section */}
        <section className="cards-section">
          <div className="Title_row">
            <h3 className="Title">Cards</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="sectionMain">
            <div className='cardList'>
              <Card number={1} total={12000} currency="HUF" id="********************5365" name={`${user?.firstName} ${user?.lastName}`} date="05/21" />
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
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Profil;
