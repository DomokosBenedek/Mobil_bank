import React, { useState } from "react";
import { Filter_darkblue, Icon_Negative, Icon_Positive } from "./img";
import TransactionDetailsPopup from "./popups/TransactionDetailsPopup";
import { TransactionProp } from "../Props/TransactionProp";
import "../../design/common/table.scss";

const Table: React.FC<any> = ({ payments }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionProp | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<"Income" | "Expense" | "All">(
    "All"
  );
  const [filterDate, setFilterDate] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [sortOption, setSortOption] = useState<string>("date-desc");
  const [showFilters, setShowFilters] = useState<boolean>(false); // Új állapot a szűrők megjelenítéséhez

  const incomeCategories: string[] = [
    "Salary",
    "Transfer",
    "Transaction",
    "Other",
  ];
  const expenseCategories: string[] = [
    "Shopping",
    "Rent",
    "Transport",
    "Transfer",
    "Transaction",
    "Other",
  ];

  const handleRowClick = (transaction: TransactionProp) => {
    setSelectedTransaction(transaction);
  };

  const handleClosePopup = () => {
    setSelectedTransaction(null);
  };

  const filteredPayments = payments
    .filter((transaction: any) => {
      if (filterCategory && transaction.category !== filterCategory)
        return false;
      if (filterType !== "All" && transaction.PaymentType !== filterType)
        return false;
      if (
        filterDate.start &&
        new Date(transaction.createdAt) < new Date(filterDate.start)
      )
        return false;
      if (
        filterDate.end &&
        new Date(transaction.createdAt) > new Date(filterDate.end)
      )
        return false;
      return true;
    })
    .sort((a: any, b: any) => {
      switch (sortOption) {
        case "amount-asc":
          return a.total - b.total;
        case "amount-desc":
          return b.total - a.total;
        case "date-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "date-desc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "description-asc":
          return a.description.localeCompare(b.description);
        case "description-desc":
          return b.description.localeCompare(a.description);
        default:
          return 0;
      }
    });

    return (
      <>
        <div className="filter-header">
          <h2 className="table-title">Tranzakciók</h2>
          <button
            className="filter-button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <img src={Filter_darkblue} alt="icon" />
          </button>
        </div>
        {showFilters && (
          <div className="filter-dropdown">
            <div>
              <label>Type:</label>
              <select
                onChange={(e) =>
                  setFilterType(e.target.value as "Income" | "Expense" | "All")
                }
              >
                <option value="All">All</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label>Category:</label>
              <select
                onChange={(e) => setFilterCategory(e.target.value || null)}
              >
                <option value="">All</option>
                {incomeCategories.concat(expenseCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Date Range:</label>
              <input
                type="date"
                onChange={(e) =>
                  setFilterDate((prev) => ({ ...prev, start: e.target.value }))
                }
              />
              -tól
              <input
                type="date"
                onChange={(e) =>
                  setFilterDate((prev) => ({ ...prev, end: e.target.value }))
                }
              />
              -ig
            </div>
            <div>
              <label>Sort By:</label>
              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="amount-desc">Amount (Highest First)</option>
                <option value="amount-asc">Amount (Lowest First)</option>
                <option value="description-asc">Description (A-Z)</option>
                <option value="description-desc">Description (Z-A)</option>
              </select>
            </div>
          </div>
        )}
        <div className="transaction-table-container">
          <table className="transaction-table">
            <tbody>
              {filteredPayments.map((transaction: any, index: number) => (
                <tr key={index} onClick={() => handleRowClick(transaction)}>
                  <td className="transaction-icon-cell">
                    {transaction.PaymentType === "Expense" ? (
                      <img
                        src={Icon_Negative}
                        alt="icon"
                        className="transaction-icon"
                      />
                    ) : (
                      <img
                        src={Icon_Positive}
                        alt="icon"
                        className="transaction-icon"
                      />
                    )}
                  </td>
                  <td className="transaction-details">
                    <p className="category">
                      <strong>{transaction.category}</strong>
                    </p>
                    <p>
                      {new Date(transaction.createdAt).toLocaleDateString("hu-HU")}
                    </p>
                    <p className="category-tag">{transaction.category}</p>
                  </td>
                  <td
                    className={`transaction-amount ${
                      transaction.PaymentType === "Expense" ? "expense" : "income"
                    }`}
                  >
                    <strong>
                      {transaction.PaymentType === "Expense" ? "-" : "+"}
                      {transaction.total} {transaction.currency}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedTransaction && (
          <TransactionDetailsPopup
            transaction={selectedTransaction}
            onClose={handleClosePopup}
          />
        )}
      </>
    );
};

export default Table;