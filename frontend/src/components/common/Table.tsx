import React, { useState } from 'react';
import { Icon_Negative, Icon_Positive } from './img';
import TransactionDetailsPopup from './popups/TransactionDetailsPopup';
import { TransactionProp } from '../Props/TransactionProp';
import '../../design/common/table.css';

const Table: React.FC<any> = ({ payments }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionProp | null>(null);

  if (!payments?.length) {
    return <p>No data available</p>;
  }

  const handleRowClick = (transaction: TransactionProp) => {
    setSelectedTransaction(transaction);
  };

  const handleClosePopup = () => {
    setSelectedTransaction(null);
  };

  return (
    <>
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
          {payments.map((transaction: any, index: number) => (
            <tr key={index} onClick={() => handleRowClick(transaction)}>
              <td className='transaction-name'>
              {transaction.PaymentType === "Expense" ? (
                  <img src={Icon_Negative} alt="icon" className="transaction-icon" />
                ) : (
                  <img src={Icon_Positive} alt="icon" className="transaction-icon" />
                )}                
                <p>({transaction.category})</p>
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
          ))}
        </tbody>
      </table>
      {selectedTransaction && (
        <TransactionDetailsPopup transaction={selectedTransaction} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default Table;