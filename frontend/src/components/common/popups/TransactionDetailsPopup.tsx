import React from 'react';
import { TransactionProp, Metric, PaymentType } from '../../Props/TransactionProp';
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/deleteAccountPopup.scss";

interface TransactionDetailsPopupProps {
  transaction: TransactionProp | null;
  onClose: () => void;
}

const TransactionDetailsPopup: React.FC<TransactionDetailsPopupProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const isRepeatable = transaction.repeatAmmount > 0 && transaction.repeatMetric !== undefined;

  return (
    <div className="popup-overlay">
      <div className="popup transaction-details">
        <h2>Transaction Details</h2>
        <p><strong>ID:</strong> {transaction.id}</p>
        <p><strong>Total:</strong> {transaction.total} {transaction.currency}</p>
        <p><strong>Type:</strong> {transaction.type === PaymentType.Expense ? 'Expense' : 'Income'}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Description:</strong> {transaction.description || 'N/A'}</p>
        <p><strong>Created At:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>

        {isRepeatable && (
          <>
            <h3>Repeatable Details</h3>
            <p><strong>Repeat Amount:</strong> {transaction.repeatAmmount}</p>
            <p><strong>Repeat Metric:</strong> {Metric[transaction.repeatMetric]}</p>
            <p><strong>Repeat Start:</strong> {new Date(transaction.repeatStart).toLocaleDateString()}</p>
            <p><strong>Repeat End:</strong> {new Date(transaction.repeatEnd).toLocaleDateString()}</p>
          </>
        )}

        <button className="primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailsPopup;