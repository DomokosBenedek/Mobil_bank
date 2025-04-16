import React, { useState, useEffect } from "react";
import {
  Card_newCard,
  placeholderIcon,
  Vector_Arrow_Dark,
} from "../../common/img";
import { logicks } from "../../common/logic";
import NewPaymentPopup from "../../common/popups/NewPaymentPopup";
import NewUserPopup from "../../common/popups/NewUserPopup";
import Card from "../../common/CardElement";
import Table from "../../common/Table";
import PieChart from "../../common/charts/pieChart";
import DeleteAccountPopup from "../../common/popups/DeleteAccountPopu";
import CardContextMenu from "../../common/ContextMenu";
import TransferPopup from "../../common/popups/TransferPopup";
import { TransferProp } from "../../Props/TransferProp";
import BarChart from "../../common/charts/barChart";
import "../../../design/profil_page_element/card.scss";
import NewCardPopup from "../../common/popups/NewCardPopup";
import DeleteRepeatableTransactionPopup from "../../common/popups/DeleteRepeatableTransactionPopupProps";
import StopRepeatableTransactionPopup from "../../common/popups/StopRepeatableTransactionPopupProps";

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
    transfer,
    SetActiveAcountClick,
    fetchRepeatableTransactions,
    stopRepeatableTransaction,
    deleteRepeatableTransaction,
    refreshData,
  } = logicks();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    accountId: string;
  } | null>(null);
  const [showNewPaymentPopup, setShowNewPaymentPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [showNewCardPopup, setShowNewCardPopup] = useState(false);
  const [incomes, setIncomes] = useState<
    { total: number; createdAt: string }[]
  >([]);
  const [expenses, setExpenses] = useState<
    { total: number; createdAt: string }[]
  >([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const [showPaymentsTable, setShowPaymentsTable] = useState(true); // Új state a váltáshoz
const [repeatableTransactions, setRepeatableTransactions] = useState<any[]>([]);
const [showStopPopup, setShowStopPopup] = useState(false);
const [showDeletePopup, setShowDeletePopup] = useState(false);
const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);


  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsData = await allpayment();
      setPayments(paymentsData || []);
    };
    const fetchIncomesAndExpenses = async () => {
      const incomesData = await fetchIncomes(activeAccount?.id || "");
      const expensesData = await fetchExpenses(activeAccount?.id || "");
      setIncomes(incomesData || []);
      setExpenses(expensesData || []);
    };
    fetchPayments();
    fetchIncomesAndExpenses();
  }, [activeAccount]);

  useEffect(() => {
    if (user?.Accounts) {
      const activeIndex = user.Accounts.findIndex(
        (account) => account.id === activeAccount?.id
      );
      setActiveCardIndex(activeIndex !== -1 ? activeIndex : 0);
    }
  }, [user, activeAccount]);

  useEffect(() => {
    const fetchRepeatableTransactionsData = async () => {
      if (activeAccount?.id) {
        const data = await fetchRepeatableTransactions(activeAccount.id);
        setRepeatableTransactions(data || []);
      }
    };
    fetchRepeatableTransactionsData();
  }, [activeAccount]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNewUserSave = (email: string) => {
    addUserToAccount(activeAccount?.id || "", email);
    setShowNewUserPopup(false);
  };

  const handleNewCardSave = () => {
    setShowNewCardPopup(false);
  };

  const handleDeleteAccount = async () => {
    await deleteAccount(activeAccount?.id || "");
    await refreshData(); // Adatok frissítése
    setShowDeleteAccountPopup(false);
  };

  const handleDisconnect = () => {
    disconnectUser(activeAccount?.id || "");
    setShowDeleteAccountPopup(false);
  };

  const handleNewPaymentSave = async () => {
    await refreshData(); 
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

  const handlePreviousCard = () => {
    if (user?.Accounts) {
      const newIndex =
        activeCardIndex === 0 ? user.Accounts.length - 1 : activeCardIndex - 1;
      setActiveCardIndex(newIndex);
      SetActiveAcountClick(user.Accounts[newIndex]);
    }
  };

  const handleNextCard = () => {
    if (user?.Accounts) {
      const newIndex =
        activeCardIndex === user.Accounts.length - 1 ? 0 : activeCardIndex + 1;
      setActiveCardIndex(newIndex);
      SetActiveAcountClick(user.Accounts[newIndex]);
    }
  };

  return (
    <>
      <main className="cardpage_profile-main-card">
        {/* Transactions Section */}
        <section className="cardpage_transactions-section">
  <div className="cardpage_Title_row">
    <p className="cardpage_Title">Tranzakciók</p>
    <button
      className="toggle-button primary_v3"
      onClick={() => setShowPaymentsTable(!showPaymentsTable)}
    >
      {showPaymentsTable ? "Ismétlődő Tranzakciók" : "Tranzakciók"}
    </button>
  </div>
  <div className="cardpage_sectionMain">
    {showPaymentsTable ? (
      <Table payments={payments} />
    ) : (
      <div className="repeatable-transactions">
        <div className="cardpage_Title_row">
          <p className="cardpage_Title">Ismétlődő fizetések</p>
        </div>
        {repeatableTransactions.length > 0 ? (
          <table className="repeatable-transactions-table">
            <thead>
              <tr>
                <th>Név és Kategória</th>
                <th>Kezdés és Befejezés</th>
                <th>Ismétlődés</th>
                <th>Összeg</th>
                <th>Műveletek</th>
              </tr>
            </thead>
            <tbody>
              {repeatableTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    <strong>{transaction.name}</strong>
                    <br />
                    {transaction.category}
                  </td>
                  <td>
                    {new Date(transaction.repeatStart)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, "/")
                      .slice(2)}{" "}
                    -{" "}
                    {new Date(transaction.repeatEnd)
                      .toISOString()
                      .split("T")[0]
                      .replace(/-/g, "/")
                      .slice(2)}
                  </td>
                  <td>
                    {transaction.repeatAmount} {transaction.repeatMetric}
                  </td>
                  <td>{transaction.total}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedTransactionId(transaction.id);
                        setShowStopPopup(true);
                      }}
                      className="action-button stop-button"
                    >
                      Stop
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTransactionId(transaction.id);
                        setShowDeletePopup(true);
                      }}
                      className="action-button delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nincsenek ismétlődő tranzakciók.</p>
        )}
      </div>
    )}
  </div>
</section>

        {/* Active Card Section */}
        <section className="cardpage_active-card-section">
          <h2>Active Card</h2>
          {user?.Accounts && user.Accounts.length > 0 ? (
            <div className="cardpage_card-selector">
              <img
                src={Vector_Arrow_Dark}
                alt="Vector"
                id="before"
                onClick={handlePreviousCard}
              />
              <div className="cardpage_card">
                <Card
                  id={
                    "*".repeat(user.Accounts[activeCardIndex].id.length - 4) +
                    user.Accounts[activeCardIndex].id.slice(-4)
                  }
                  number={activeCardIndex + 1}
                  total={user.Accounts[activeCardIndex].total}
                  currency={user.Accounts[activeCardIndex].currency.toString()}
                  name={user.Accounts[activeCardIndex].ownerName}
                  date={new Date(
                    user.Accounts[activeCardIndex].createdAt
                  ).toLocaleDateString("hu-HU", {
                    year: "2-digit",
                    month: "2-digit",
                  })}
                />
              </div>
              <img
                src={Vector_Arrow_Dark}
                alt="Vector"
                id="next"
                onClick={handleNextCard}
              />
            </div>
          ) : (
            <p>No active account selected.</p>
          )}
          <h4>{`Számla tulajdonos:`}</h4>
          <h4>{`${
            user?.Accounts ? user.Accounts[activeCardIndex]?.ownerName : ""
          }`}</h4>
          {/*Buttons*/}
          <div className="button-grid">
            <button onClick={() => setShowNewCardPopup(true)}>
              <img src={placeholderIcon} alt="New Card" />
              <p>Új Számla</p>
            </button>
            <button onClick={() => setShowNewPaymentPopup(true)}>
              <img src={placeholderIcon} alt="New Payment" />
              <p>Új tranzakció</p>
            </button>
            <button onClick={() => setShowNewUserPopup(true)}>
              <img src={placeholderIcon} alt="New User" />
              <p>Felhasználó hozzáadása</p>
            </button>
            <button onClick={() => setShowDeleteAccountPopup(true)}>
              <img src={placeholderIcon} alt="Delete Account" />
              <p>Számla törlése</p>
            </button>
          </div>
          <div className="card-indicators">
            {user?.Accounts?.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === activeCardIndex ? "active" : ""
                }`}
              ></span>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section className="cardpage_bar-diagram-section">
          <div className="cardpage_Title_row">
            <h3 className="cardpage_Title">Oszlop Diagram</h3>
          </div>
          <div className="cardpage_sectionMain">
            <BarChart incomes={incomes} expenses={expenses} />
          </div>
        </section>

        <section className="cardpage_pie-diagram-section">
          <div className="cardpage_Title_row">
            <h3 className="cardpage_Title">Kör Diagram</h3>
          </div>
          <div className="cardpage_sectionMain">
            <PieChart incomes={incomes} expenses={expenses} />
          </div>
        </section>
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
          <NewUserPopup
            onClose={() => setShowNewUserPopup(false)}
            onSave={handleNewUserSave}
          />
        </div>
      )}
      {showDeleteAccountPopup && (
        <div className="popup-overlay">
          <DeleteAccountPopup
            onClose={() => setShowDeleteAccountPopup(false)}
            onDelete={handleDeleteAccount}
            onDisconnect={handleDisconnect}
          />
        </div>
      )}
      {showNewPaymentPopup && (
        <NewPaymentPopup
          onClose={() => setShowNewPaymentPopup(false)}
          onSave={handleNewPaymentSave}
        />
      )}
      {showTransferPopup && activeAccount?.id && user?.id && (
        <TransferPopup
          onClose={() => setShowTransferPopup(false)}
          onTransfer={handleTransfer}
          activeAccountId={activeAccount.id}
          userId={user.id || ""}
        />
      )}
      {showNewCardPopup && (
        <NewCardPopup
          onClose={() => setShowNewCardPopup(false)}
          onSave={handleNewCardSave}
        />
      )}
      {showStopPopup && selectedTransactionId && (
  <StopRepeatableTransactionPopup
    onClose={() => setShowStopPopup(false)}
    onConfirm={async () => {
      await stopRepeatableTransaction(selectedTransactionId);
      setShowStopPopup(false);
      const updatedTransactions = await fetchRepeatableTransactions(
        activeAccount?.id || ""
      );
      setRepeatableTransactions(updatedTransactions);
    }}
  />
)}

{showDeletePopup && selectedTransactionId && (
  <DeleteRepeatableTransactionPopup
    onClose={() => setShowDeletePopup(false)}
    onConfirm={async () => {
      await deleteRepeatableTransaction(selectedTransactionId);
      setShowDeletePopup(false);
      const updatedTransactions = await fetchRepeatableTransactions(
        activeAccount?.id || ""
      );
      setRepeatableTransactions(updatedTransactions);
    }}
  />
)}
    </>
  );
};

export default Card_Page;