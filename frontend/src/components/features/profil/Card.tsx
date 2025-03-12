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
import "../../../design/profil_page_element/card.css";

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

  return (
    <>
      <main className="cardpage_profile-main-card">
        {/* Transactions Section */}
        <section className="cardpage_transactions-section">
          <div className="cardpage_Title_row">
            <h3 className="cardpage_Title">Transactions</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="cardpage_sectionMain">
            <Table payments={payments} />
          </div>
        </section>

        {/* Active Card Section */}
        <section className="cardpage_active-card-section">
          <h2>Active Card</h2>
          {activeAccount ? (
            <div className="cardpage_card-selector">
              <img src={Vector_Arrow_Dark} alt="Vector" id="before" />
              <div
                className={"card active"}
                onContextMenu={(e) => handleRightClick(e, activeAccount.id)}
              >
                <Card
                  id={
                    "*".repeat(activeAccount.id.length - 4) +
                    activeAccount.id.slice(-4)
                  }
                  number={1}
                  total={activeAccount.total}
                  currency={activeAccount.currency.toString()}
                  name={activeAccount.ownerName}
                  date={new Date(activeAccount.createdAt).toLocaleDateString(
                    "hu-HU",
                    { year: "2-digit", month: "2-digit" }
                  )}
                />
              </div>
              <img src={Vector_Arrow_Dark} alt="Vector" id="next" />
            </div>
          ) : (
            <p>No active account selected.</p>
          )}
          <h4>{`Card owner: ${activeAccount?.ownerName}`}</h4>
          <div className="shared-users">
            <p>Shared with:</p>
            <p>{activeAccount?.userId.join(", ")}</p>
          </div>
          <div className="buttons">
            <button onClick={() => setShowNewPaymentPopup(true)}>
              Add New Payment
            </button>
            <button onClick={() => setShowNewUserPopup(true)}>
              Add New User
            </button>
            <button onClick={() => setShowDeleteAccountPopup(true)}>
              Delete Account
            </button>
          </div>
        </section>

        {/* Charts Section */}
        <section className="cardpage_bar-diagram-section">
          <div className="cardpage_Title_row">
            <h3 className="cardpage_Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
          </div>
          <div className="cardpage_sectionMain">
            <BarChart incomes={incomes} expenses={expenses} />
          </div>
        </section>

        <section className="cardpage_pie-diagram-section">
          <div className="cardpage_Title_row">
            <h3 className="cardpage_Title">Diagrams</h3>
            <button className="primary_v3">View more</button>
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