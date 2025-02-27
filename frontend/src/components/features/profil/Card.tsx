import React, { useState, useEffect } from 'react';
import { Card_newCard } from "../../common/img";
import { logicks } from "../../common/logic";
import NewPaymentPopup from '../../common/popups/NewPaymentPopup';
import NewUserPopup from '../../common/popups/NewUserPopup';
import Card from '../../common/CardElement';
import Table from '../../common/Table';
import PieChart from '../../common/charts/pieChart';
import '../../../design/profil_page_element/card.css';
import DeleteAccountPopup from '../../common/popups/DeleteAccountPopu';
import CardContextMenu from '../../common/ContextMenu';
import TransferPopup from '../../common/popups/TransferPopup';
import { TransferProp } from '../../Props/TransferProp';

const Card_Page: React.FC = () => {
  const { 
    user,
    loading,
    error,
    activeAccount,
    deleteAccount,
    addUserToAccount,
    fetchIncomes,
    fetchExpenses,
    allpayment,
    disconnectUser,
    transfer
  } = logicks();
  
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; accountId: string } | null>(null);
  const [showNewPaymentPopup, setShowNewPaymentPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [incomes, setIncomes] = useState<{ total: number; createdAt: string }[]>([]);
  const [expenses, setExpenses] = useState<{ total: number; createdAt: string }[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [showTransferPopup, setShowTransferPopup] = useState(false);

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

  const handleNewUserSave = (email: string) => {
    addUserToAccount(activeAccount?.id || '', email);
    setShowNewUserPopup(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount(activeAccount?.id || '');
    setShowDeleteAccountPopup(false);
  };
  const handleDisconnect = () => {
    disconnectUser(activeAccount?.id || '');
    setShowDeleteAccountPopup(false);
  };

  const handleNewPaymentSave = () => {
    setShowNewPaymentPopup(false);
  };

  const handleRightClick = (event: React.MouseEvent, accountId: string) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, accountId });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleTransfer = async (transferData: TransferProp) => {
    await transfer(transferData);
    setShowTransferPopup(false);
  };

  return (
    <>
      <main className="profile-main-card">
        <div className="profile-content">
          <section className="active-card-section">
            <h2>Active Card</h2>
            {activeAccount ? (
              <div>
                <div className={"card active"} onContextMenu={(e) => handleRightClick(e, activeAccount.id)}>
                  <Card
                    id={'*'.repeat(activeAccount.id.length - 4) + activeAccount.id.slice(-4)}
                    number={1}
                    total={activeAccount.total}
                    currency={activeAccount.currency.toString()}
                    name={activeAccount.ownerName}
                    date={new Date(activeAccount.createdAt).toLocaleDateString('hu-HU', { year: '2-digit', month: '2-digit' })}
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
            <h4>{`Card owner: ${activeAccount?.ownerName}`}</h4>
            <p>
                {`Shared with: \n
                ${activeAccount?.userId.map((user) => user) + ", "}`}
            </p>
            <button onClick={() => setShowNewUserPopup(true)}>Add New User</button>
            <button onClick={() => setShowDeleteAccountPopup(true)}>Delete Account</button>
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

          <section className="diagram-section">
            <div className="Title_row">
              <h3 className="Title">Diagrams</h3>
              <button className="primary_v3">View more</button>
            </div>
            <div className="sectionMain">
              <PieChart incomes={incomes} expenses={expenses} />
            </div>
          </section>
        </div>
      </main>
      {contextMenu && (
        <CardContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onDelete={() => setShowDeleteAccountPopup(true)}
          onAddPayment={() => setShowNewPaymentPopup(true)}
          onAddUser={() => setShowNewUserPopup(true)}
          onTransfer={() => setShowTransferPopup(true)}
        />
      )}
      {showNewUserPopup && (
        <div className="popup-overlay">
          <NewUserPopup onClose={() => setShowNewUserPopup(false)} onSave={handleNewUserSave} />
        </div>
      )}
      {showDeleteAccountPopup && (
        <div className="popup-overlay">
          <DeleteAccountPopup onClose={() => setShowDeleteAccountPopup(false)} onDelete={handleDeleteAccount} onDisconnect={handleDisconnect} />
        </div>
      )}
      {showNewPaymentPopup && (
        <NewPaymentPopup onClose={() => setShowNewPaymentPopup(false)} onSave={handleNewPaymentSave} />
      )}
            {showTransferPopup && activeAccount?.id && user?.id && (
        <TransferPopup 
          onClose={() => setShowTransferPopup(false)} 
          onTransfer={handleTransfer} 
          activeAccountId={activeAccount.id} 
          userId={user.id || ''} 
        />
      )}
    </>
  );
};

export default Card_Page;