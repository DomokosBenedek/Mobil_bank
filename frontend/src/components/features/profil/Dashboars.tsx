import React, { useState, useEffect } from "react";
import Card from "../../common/CardElement";
import { Card_newCard, Icon_Profil_circle } from "../../common/img";
import { logicks } from "../../common/logic";
import CardContextMenu from "../../common/ContextMenu";
import Table from "../../common/Table";
import "../../../design/profil_page_element/dashboard.css";
import BarChart from "../../common/charts/barChart";
import NewPaymentPopup from "../../common/popups/NewPaymentPopup";
import DeleteAccountPopup from "../../common/popups/DeleteAccountPopu";
import NewUserPopup from "../../common/popups/NewUserPopup";
import TransferPopup from "../../common/popups/TransferPopup";
import PieChart from "../../common/charts/pieChart";
import ChangesCardSection from "../../ChangesCardSection"; // Import the ChangesCardSection component
import { TransferProp } from "../../Props/TransferProp";

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
    disconnectUser,
    transfer,
    userToken,
    fetchApiEur,
    fetchApiUsd,
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

  const [eurData, setEurData] = useState<any>(null);
  const [usdData, setUsdData] = useState<any>(null);
  const [eurExchangeRates, setEurExchangeRates] = useState<
    { rate: any; date: string }[]
  >([]);
  const [usdExchangeRates, setUsdExchangeRates] = useState<
    { rate: any; date: string }[]
  >([]);

  const handleRightClick = (event: React.MouseEvent, accountId: string) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY + window.scrollY,
      accountId,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

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

  const handleTransfer = async (transferData: TransferProp) => {
    await transfer(transferData);
    setShowTransferPopup(false);
  };

  const getIconClass = (change: number) => {
    return change >= 0 ? "rotate-left" : "rotate-right";
  };

  async function eurApi(date: string) {
    const eurResult = await fetchApiEur(date);
    setEurData(eurResult);
    return eurResult;
  }

  async function usdApi(date: string) {
    const usdResult = await fetchApiUsd(date);
    setUsdData(usdResult);
    return usdResult;
  }

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
    async function multLekerdezesEur(ism: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - ism);
      for (let i = 0; i < ism; i++) {
        date.setDate(date.getDate() + 1);
        let dateString = date.toISOString().split("T")[0];
        let data: any = await eurApi(dateString);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setEurExchangeRates(rates);
    }
    async function multLekerdezesUsd(ism: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - ism);
      for (let i = 0; i < ism; i++) {
        date.setDate(date.getDate() + 1);
        let dateString = date.toISOString().split("T")[0];
        let data: any = await usdApi(dateString);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setUsdExchangeRates(rates);
    }
    setEurExchangeRates([]);
    setUsdExchangeRates([]);
    eurApi("2025-02-24");
    usdApi("2025-02-24");
    multLekerdezesEur(30);
    multLekerdezesUsd(30);
  }, []);

  const getCardClass = (change: number) => {
    return change >= 0 ? "positive" : "negative";
  };

  const getChangePercentage = (today: number, yesterday: number) => {
    return (((today - yesterday) / yesterday) * 100).toFixed(2);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <main className="profile-container">
        {/* Cards Section */}
        <section className="cards-section">
          <div className="Title_row">
            <h3 className="Title">Számlák</h3>
          </div>
          <div className="sectionMain">
            <div className="cardList">
              {user?.Accounts?.map((account, index) => {
                const isActive = activeAccount?.id === account.id;
                return (
                  <div
                    key={account.id}
                    className={`card ${isActive ? "active" : ""}`}
                    onClick={() => SetActiveAcountClick(account)}
                    onContextMenu={(e) => handleRightClick(e, account.id)}
                  >
                    <div className="card-content">
                      <Card
                        id={
                          "*".repeat(account.id.length - 4) +
                          account.id.slice(-4)
                        }
                        number={index + 1}
                        total={account.total || 0}
                        currency={account.currency || "N/A"}
                        name={`${account.ownerName}`}
                        date={new Date(account.createdAt).toLocaleDateString(
                          "hu-HU",
                          { year: "2-digit", month: "2-digit" }
                        )}
                      />
                    </div>
                  </div>
                );
              })}
              <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />
            </div>
          </div>
        </section>

        {/* User Section */}
        <section className="user-section">
          <div className="Title_row">
            <h3 className="Title">Felhasználó</h3>
          </div>
          <div className="sectionMain">
            <img src={Icon_Profil_circle} alt="profile_icon" />
            <h2>Üdv újra:</h2>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <h2>Total:</h2>
            <p>{}</p>
          </div>
        </section>

        {/* Changes Card Section */}
        <section className="changes-card-section">
          <div className="Title_row">
            <h3 className="Title">Árfolyamok</h3>
          </div>
          <div className="sectionMain">
            <div className="changesList">
              <ChangesCardSection
                currencys={["eur", "usd"]}
                currencyData={{ eur: eurData, usd: usdData }}
                exchangeRates={{ eur: eurExchangeRates, usd: usdExchangeRates }}
                getChangePercentage={getChangePercentage}
                getCardClass={getCardClass}
                getIconClass={getIconClass}
                handleCardClick={(currency) => console.log(currency)}
              />
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="transactions-section">
          <div className="Title_row">
            <h3 className="Title">Tranzakciók</h3>
          </div>
          <div className="sectionMain">
            <Table payments={payments} />
          </div>
        </section>

        {/* Charts Section */}
        <section className="bar-diagram-section">
          <div className="Title_row">
            <h3 className="Title">Oszlop Diagram</h3>
          </div>
          <div className="sectionMain">
            <BarChart incomes={incomes} expenses={expenses} />
          </div>
        </section>

        <section className="pie-diagram-section">
          <div className="Title_row">
            <h3 className="Title">Kör Diagram</h3>
          </div>
          <div className="sectionMain">
            <PieChart incomes={incomes} expenses={expenses} />
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
      </main>
    </>
  );
};

export default Dashboard_Page;
