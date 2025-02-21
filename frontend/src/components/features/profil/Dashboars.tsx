import React, { useState, useEffect } from 'react';
import CostumeNavbar from "../../common/navbar";
import Sidebar from "./Sidebar";
import Card from "../../common/CardElement";
import { Card_newCard } from "../../common/img";
import Footer from "../../common/Footer";
import { logicks } from "../../common/logic";
import CardContextMenu from '../../common/ContextMenu';
import PieChart from '../../common/charts/pieChart';
import Table from '../../common/Table';
import "../../../design/profil_page_element/dashboard.css";
import BarChart from '../../common/charts/barChart';
import NewPaymentPopup from '../../common/popups/NewPaymentPopup';
import DeleteAccountPopup from '../../common/popups/DeleteAccountPopu';
import NewUserPopup from '../../common/popups/NewUserPopup';

const Dashboard_Page: React.FC = () => {
  const { 
    user,
    loading,
    error,
    activeAccount,
    SetActiveAcountClick,
    addNewAccount,
    deleteAccount,
    addUserToAccount,
    fetchIncomes,
    fetchExpenses,
    allpayment,
  } = logicks();

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; accountId: string } | null>(null);
  const [showNewPaymentPopup, setShowNewPaymentPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [incomes, setIncomes] = useState<{ total: number; createdAt: string }[]>([]);
  const [expenses, setExpenses] = useState<{ total: number; createdAt: string }[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsData = await allpayment();
      setPayments(paymentsData || []);
    };
    const fetchIncomesAndExpenses = async () => {
      const incomesData = await fetchIncomes(activeAccount?.id || '');
      const expensesData = await fetchExpenses(activeAccount?.id || '');
      setIncomes(incomesData || []);
      setExpenses(expensesData || []);
    };
    fetchPayments();
    fetchIncomesAndExpenses();
  }, [activeAccount]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleRightClick = (event: React.MouseEvent, accountId: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, accountId });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleNewUserSave = (email: string) => {
    addUserToAccount(activeAccount?.id || '', email);
    setShowNewUserPopup(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount(activeAccount?.id || '');
    setShowDeleteAccountPopup(false);
  };

  const handleNewPaymentSave = () => {
    setShowNewPaymentPopup(false);
  };

  return (
    <>
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
                    name={`${account.ownerName}`}
                    date={new Date(account.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
                  />
                </div>
              );
            })}
            <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />
          </div>
        </div>
      </section>

      {/* Transactions Section */}
      <section className="transactions-section">
        <div className="Title_row">
          <h3 className="Title">Transactions</h3>
          <button className="primary_v3">View more</button>
        </div>
        <div className="sectionMain">
          <Table payments={payments} />
        </div>
      </section>
          
      {/*Charts Section */}
      <section className="diagram-section">
        <div className="Title_row">
          <h3 className="Title">Diagrams</h3>
          <button className="primary_v3">View more</button>
        </div>
        <div className="sectionMain">
          <BarChart incomes={incomes} expenses={expenses} />
        </div>   
      </section>
      {contextMenu && (
        <CardContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => setShowDeleteAccountPopup(true)}
          onAddPayment={() => setShowNewPaymentPopup(true)}
          onAddUser={() => setShowNewUserPopup(true)}
        />
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
      {showNewPaymentPopup && (
        <NewPaymentPopup onClose={() => setShowNewPaymentPopup(false)} onSave={handleNewPaymentSave} />
      )}
    </>
  );
};

export default Dashboard_Page;