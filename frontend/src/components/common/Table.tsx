import React, { useEffect, useState } from 'react';
import { logicks } from './logic';
import { placeholderIcon } from './img';

const Table: React.FC = () => {
  const { getAllPayments, incomes, expenses, activeAccount } = logicks();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (activeAccount) {
     setTransactions(getAllPayments);
    }
  }, [activeAccount, incomes, expenses]);

  if (!incomes?.length && !expenses?.length) {
    return <p>No data available</p>;
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Name of Transaction</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction: any, index: number) => (
            <tr key={index}>
              <td>
                <img src={placeholderIcon} alt="icon" className="transaction-icon" />
                <p>{transaction.id} ({transaction.category})</p>
              </td>
              <td>{new Date(transaction.createdAt).toLocaleDateString('hu-HU')}</td>
              <td className={transaction.PaymentType === "Expense" ? 'expense' : 'income'}>
                {transaction.PaymentType === "Expense" ? (
                  <p>-{transaction.total} {transaction.currency}</p>
                ) : (
                  <p>+{transaction.total} {transaction.currency}</p>
                )}
              </td>
              <td>{transaction.category}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No transactions found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;