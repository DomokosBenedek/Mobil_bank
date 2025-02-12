import React from 'react';
import { logicks } from './logic';
import { placeholderIcon } from './img';


const Table: React.FC = () => {
    const { getAllPayments } = logicks();
    
    const transactions = getAllPayments();
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
          {transactions.map((transaction: any, index: number) => (
            <tr key={index}>
              <td>
                <img src={placeholderIcon} alt="icon" className="transaction-icon" />
                {transaction.name}
              </td>
              <td>{new Date(transaction.date).toLocaleDateString('hu-HU')}</td>
              <td className={transaction.amount > 0 ? 'income' : 'expense'}>
                {transaction.amount > 0 ? '+' : '-'}{transaction.amount} {transaction.currency}
              </td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default Table;