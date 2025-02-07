import React, { useState } from 'react';
import CostumeNavbar from "../../components/common/navbar";
import Sidebar from "./Sidebar";
import Card from "../../components/common/Card";
import { Card_newCard } from "../../components/common/img";
import Footer from "../../components/common/Footer";
import "../../design/profil_page_element/dashboard.css";
import { logicks } from "../../components/common/logic";
import CardContextMenu from '../../components/common/ContextMenu';

const Dashboard_Page: React.FC = () => {
  const {
    user,
    loading,
    error,
    activeAccount,
    SetActiveAcountClick,
    addNewAccount,
    deleteAccount,
    addIncome,
    addExpense,
    addUserToAccount,
  } = logicks();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; accountId: string } | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRightClick = (event: React.MouseEvent, accountId: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, accountId });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
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
              {user?.Accounts?.map((account, index) => {
                const isActive = activeAccount?.id === account.id;
                return (
                  <div key={account.id} className={`card ${isActive ? 'active' : ''}`} onClick={() => SetActiveAcountClick(account)} onContextMenu={(e) => handleRightClick(e, account.id)}>
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
            </div>
            <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />
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
      {contextMenu && (
        <CardContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => deleteAccount(contextMenu.accountId)}
          onAddIncome={() => addIncome(contextMenu.accountId, 0)} // Replace 0 with actual amount
          onAddExpense={() => addExpense(contextMenu.accountId, 0)} // Replace 0 with actual amount
          onAddUser={() => addUserToAccount(contextMenu.accountId, '')} // Replace '' with actual userId
        />
      )}
    </>
  );
};

export default Dashboard_Page;