import React, { useState, useEffect } from "react";
import Card from "../../common/CardElement";
import {
  Card_newCard,
  Icon_Profil_circle,
  placeholderIcon,
} from "../../common/img";
import { logicks } from "../../common/logic";
import CardContextMenu from "../../common/ContextMenu";
import Table from "../../common/Table";
import BarChart from "../../common/charts/barChart";
import NewPaymentPopup from "../../common/popups/NewPaymentPopup";
import DeleteAccountPopup from "../../common/popups/DeleteAccountPopu";
import NewUserPopup from "../../common/popups/NewUserPopup";
import TransferPopup from "../../common/popups/TransferPopup";
import PieChart from "../../common/charts/pieChart";
import { TransferProp } from "../../Props/TransferProp";
import NewCardPopup from "../../common/popups/NewCardPopup";
import "../../../design/profil_page_element/dashboard.scss";
import DeleteRepeatableTransactionPopup from "../../common/popups/DeleteRepeatableTransactionPopupProps";
import StopRepeatableTransactionPopup from "../../common/popups/StopRepeatableTransactionPopupProps";
import ChangesCardSection from "../../common/ChangesCardSection";

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
    fetchApiCurrency,
    fetchRepeatableTransactions,
    stopRepeatableTransaction,
    deleteRepeatableTransaction,
  } = logicks();

  console.log("userToken: ", userToken);
  console.log("userId: ", user?.id);
  console.log("accountId", activeAccount?.id);

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
  const [showNewCardPopup, setShowNewCardPopup] = useState(false);

  const [currencyData, setCurrencyData] = useState<{ [key: string]: any }>({});
  const [exchangeRates, setExchangeRates] = useState<{
    [key: string]: { rate: any; date: string }[];
  }>({});
  const currencys = [
    "eur",
    "usd",
    "aud",
    "cad",
    "chf",
    "czk",
    "gbp",
    "hrk",
    "jpy",
    "nok",
    "pln",
    "ron",
    "rub",
    "sek",
    "uah",
  ];

  const [totalSum, setTotalSum] = useState<number>(0); // Új state az összesített total értékhez
  const [repeatableTransactions, setRepeatableTransactions] = useState<any[]>(
    []
  );

  const [showPaymentsTable, setShowPaymentsTable] = useState(true); // Új state a váltáshoz
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

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

  const handleNewCardSave = () => {
    setShowNewCardPopup(false);
  };

  const getIconClass = (change: number) => {
    return change >= 0 ? "rotate-left" : "rotate-right";
  };

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
    const fetchRepeatableTransactionsData = async () => {
      if (activeAccount?.id) {
        const data = await fetchRepeatableTransactions(activeAccount.id);
        setRepeatableTransactions(data || []);
      }
    };
    fetchRepeatableTransactionsData();
  }, [activeAccount]);

  useEffect(() => {
    async function fetchCurrencyData(date: string, currency: string) {
      const result = await fetchApiCurrency(date, currency);
      setCurrencyData((prevData) => ({ ...prevData, [currency]: result }));
      return result;
    }

    async function fetchExchangeRates(currency: string, days: number) {
      let rates: { rate: any; date: string }[] = [];
      let date = new Date();
      date.setDate(date.getDate() - days);
      for (let i = 0; i < days; i++) {
        date.setDate(date.getDate() + 1);
        const dateString = date.toISOString().split("T")[0];
        const data: any = await fetchCurrencyData(dateString, currency);
        rates.push({ rate: data.changes.huf, date: dateString });
      }
      setExchangeRates((prevRates) => ({ ...prevRates, [currency]: rates }));
    }

    currencys.forEach((currency) => {
      fetchCurrencyData("2025-02-24", currency);
      fetchExchangeRates(currency, 30);
    });
  }, []);

  useEffect(() => {
    const sum =
      user?.Accounts?.reduce((acc, account) => acc + (account.total || 0), 0) ||
      0;
    setTotalSum(sum);
  }, [user?.Accounts, activeAccount]); // Figyeljük a változásokat

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
      <main className="Dashboard-profile-container sidebar-collapsed">
        {/* Cards Section */}
        <section className="Dashboard-cards-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Számláid</p>
          </div>
          {/* Új kártya ikon */}
          <img src={Card_newCard} alt="NewCard" onClick={addNewAccount} />

          {/* Kártyák listája */}
          <div className="card-list">
            {user?.Accounts?.map((account, index) => (
              <div
                key={account.id}
                className={`Dashboard-card ${
                  activeAccount?.id === account.id ? "active" : ""
                }`}
                onClick={() => SetActiveAcountClick(account)}
              >
                <Card
                  id={"*".repeat(account.id.length - 4) + account.id.slice(-4)}
                  number={index + 1}
                  total={account.total || 0}
                  currency={account.currency || "N/A"}
                  name={account.ownerName}
                  date={new Date(account.createdAt).toLocaleDateString(
                    "hu-HU",
                    {
                      year: "2-digit",
                      month: "2-digit",
                    }
                  )}
                />
              </div>
            ))}
          </div>
        </section>

        {/* User Section */}
        <section className="Dashboard-user-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Felhasználó</p>
          </div>
          <div className="Dashboard-sectionMain">
            {/* User Info */}
            <div className="user-info">
              <img src={Icon_Profil_circle} alt="profile_icon" />
              <p>Üdv újra:</p>
              <h2>
                {user?.firstName} {user?.lastName}
              </h2>
            </div>
            {/* Total Info */}
            <div className="total-info">
              <p>Az számláin lévő összegek értéke:</p>
              <h2>
                {totalSum} {user?.Accounts?.[0]?.currency || "HUF"}
              </h2>
            </div>
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
          </div>
        </section>

        {/* Changes Card Section */}
        <section className="Dashboard-changes-card-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Árfolyamok</p>
          </div>
          <div className="Dashboard-sectionMain">
            <div className="Dashboard-changesList">
              <ChangesCardSection
                currencys={currencys}
                currencyData={currencyData}
                exchangeRates={exchangeRates}
                getChangePercentage={getChangePercentage}
                getCardClass={getCardClass}
                getIconClass={getIconClass}
                handleCardClick={(currency) => console.log(currency)}
              />
            </div>
          </div>
        </section>

        {/* Transactions Section */}
        <section className="Dashboard-transactions-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Tranzakciók</p>
            <button
              className="toggle-button primary_v3"
              onClick={() => setShowPaymentsTable(!showPaymentsTable)}
            >
              {showPaymentsTable ? "Ismétlődő Tranzakciók" : "Tranzakciók"}
            </button>
          </div>
          <div className="Dashboard-sectionMain">
            {showPaymentsTable ? (
              <Table payments={payments} />
            ) : (
              <div className="repeatable-transactions">
                <div className="Dashboard-Title_row">
                  <p className="Dashboard-Title">Ismétlödő fizetések</p>
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
                            {transaction.repeatAmount}{" "}
                            {transaction.repeatMetric}
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

        {/* Charts Section */}
        <section className="Dashboard-bar-diagram-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Oszlop Diagram</p>
          </div>
          <div className="Dashboard-sectionMain">
            <BarChart incomes={incomes} expenses={expenses} />
          </div>
        </section>

        <section className="Dashboard-pie-diagram-section">
          <div className="Dashboard-Title_row">
            <p className="Dashboard-Title">Kör Diagram</p>
          </div>
          <div className="Dashboard-sectionMain">
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
          <div className="Dashboard-popup-overlay">
            <NewUserPopup
              onClose={() => setShowNewUserPopup(false)}
              onSave={handleNewUserSave}
            />
          </div>
        )}
        {showDeleteAccountPopup && (
          <div className="Dashboard-popup-overlay">
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
      </main>
    </>
  );
};

export default Dashboard_Page;
