// filepath: c:\Users\bened\Git\Mobil_bank\frontend\src\components\features\profil\Card.tsx
import React, { useState, useEffect } from "react";
import { Card_newCard, Vector_Arrow_Dark } from "../../common/img";
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
  } = logicks();

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    accountId: string;
  } | null>(null);
  const [showNewPaymentPopup, setShowNewPaymentPopup] = useState(false);
  const [showNewUserPopup, setShowNewUserPopup] = useState(false);
  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
  const [incomes, setIncomes] = useState<
    { total: number; createdAt: string }[]
  >([]);
  const [expenses, setExpenses] = useState<
    { total: number; createdAt: string }[]
  >([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [showTransferPopup, setShowTransferPopup] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleNewUserSave = (email: string) => {
    addUserToAccount(activeAccount?.id || "", email);
    setShowNewUserPopup(false);
  };

  const handleDeleteAccount = () => {
    deleteAccount(activeAccount?.id || "");
    setShowDeleteAccountPopup(false);
  };
  const handleDisconnect = () => {
    disconnectUser(activeAccount?.id || "");
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

  const handlePreviousCard = () => {
    if (user?.Accounts) {
      const newIndex =
        activeCardIndex === 0
          ? user.Accounts.length - 1
          : activeCardIndex - 1;
      setActiveCardIndex(newIndex);
      SetActiveAcountClick(user.Accounts[newIndex]);
    }
  };

const handleNextCard = () => {
  if (user?.Accounts) {
      const newIndex =
          activeCardIndex === user.Accounts.length - 1
              ? 0
              : activeCardIndex + 1;
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
            <h3 className="cardpage_Title">Tranzakciók</h3>
          </div>
          <div className="cardpage_sectionMain">
            <Table payments={payments} />
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
          <h4>{`Card owner: ${user?.Accounts ? user.Accounts[activeCardIndex]?.ownerName : ""}`}</h4>
          <div className="shared-users">
            <p>Shared with:</p>
            <p>{user?.Accounts && user.Accounts[activeCardIndex]?.userId.join(", ")}</p>
          </div>
          <div className="buttons">
            <button onClick={() => setShowNewPaymentPopup(true)}>
              Új Tranzakciók
            </button>
            <button onClick={() => setShowNewUserPopup(true)}>
              Felhasználó hozzáadása
            </button>
            <button onClick={() => setShowDeleteAccountPopup(true)}>
              Számla törlése
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
    </>
  );
};

export default Card_Page;