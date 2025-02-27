import React from 'react';
import { TransactionProp } from '../../Props/TransactionProp';

interface TransactionDetailsPopupProps {
  transaction: TransactionProp | null;
  onClose: () => void;
}

const TransactionDetailsPopup: React.FC<TransactionDetailsPopupProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Transaction Details</h2>
        <p><strong>ID:</strong> {transaction.id}</p>
        <p><strong>Total:</strong> {transaction.total}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Currency:</strong> {transaction.currency}</p>
        <p><strong>User ID:</strong> {transaction.userId}</p>
        <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
        <p><strong>Account ID:</strong> {transaction.accountId}</p>
        <p><strong>Repeat Amount:</strong> {transaction.repeatAmmount}</p>
        <p><strong>Repeat Metric:</strong> {transaction.repeatMetric}</p>
        <p><strong>Repeat Start:</strong> {new Date(transaction.repeatStart).toLocaleString()}</p>
        <p><strong>Repeat End:</strong> {new Date(transaction.repeatEnd).toLocaleString()}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TransactionDetailsPopup;