import React, { useState } from 'react';
import { Card_newCard, placeholderCard } from "../../common/img";
import { logicks } from "../../common/logic";
import NewPaymentPopup from '../../common/popups/NewPaymentPopup';
import NewUserPopup from '../../common/popups/NewUserPopup';
import Card from '../../common/CardElement';
import Table from '../../common/Table';
import PieChart from '../../common/charts/pieChart';
import '../../../design/profil_page_element/card.css';
import DeleteAccountPopup from '../../common/popups/DeleteAccountPopu';

const Card_Page: React.FC = () => {
  const { user, loading, error, activeAccount, addIncome, addExpense, addUserToAccount, deleteAccount, SetActiveAcountClick } = logicks();
  const [showNewPaymentPopup, setShowNewPaymentPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNewPaymentSave = (payment: any) => {
    if (payment.type === 'Income') {
      addIncome(activeAccount?.id || '', payment.amount);
    } else {
      addExpense(activeAccount?.id || '', payment.amount);
    }
    setShowNewPaymentPopup(false);
  };

  const handleNewUserSave = (email: string) => {
    addUserToAccount(activeAccount?.id || '', email);
    setShowNewUserPopup(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount(activeAccount?.id || '');
    setShowDeleteAccountPopup(false);
  };

  return (
    <>
      <main className="profile-main">
        <div className="profile-content">
          <section className="active-card-section">
            <h2>Active Card</h2>
            {activeAccount ? (
              <div>
                <div className={"card active"}>
                <Card
                  id={activeAccount.id}
                  number={1}
                  total={activeAccount.total}
                  currency={activeAccount.currency.toString()}
                  name={activeAccount.ownerName}
                  date={new Date(activeAccount.createdAt).toLocaleDateString()}
                />
                  </div>

                <img src={Card_newCard} alt="New Payment" onClick={() => setShowNewPaymentPopup(true)} />
              </div>
            ) : (
              <p>No active account selected.</p>
            )}
          </section>

          <section className="profile-settings-section">
            <h2>Profile + Settings</h2>
            <p>{user?.firstName} {user?.lastName}</p>
            <button onClick={() => setShowNewUserPopup(true)}>Add New User</button>
            <button onClick={() => setShowDeleteAccountPopup(true)}>Delete Account</button>
          </section>

          <section className="transactions-section">
            <div className="Title_row">
              <h3 className="Title">Transactions</h3>
              <button className="primary_v3">View more</button>
            </div>
            <div className="sectionMain">
              <Table />
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
        </div>
      </main>
      {showNewPaymentPopup && (
        <div className="popup-overlay">
          <NewPaymentPopup onClose={() => setShowNewPaymentPopup(false)} onSave={handleNewPaymentSave} />
        </div>
      )}
      {showNewUserPopup && (
        <div className="popup-overlay">
          <NewUserPopup onClose={() => setShowNewUserPopup(false)} onSave={handleNewUserSave} />
        </div>
      )}
      {showDeleteAccountPopup && (
        <div className="popup-overlay">
          <DeleteAccountPopup onClose={() => setShowDeleteAccountPopup(false)} onDelete={handleDeleteAccount} />
        </div>
      )}
    </>
  );
};

export default Card_Page;