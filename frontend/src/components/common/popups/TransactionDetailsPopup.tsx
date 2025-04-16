import React from 'react';
import { TransactionProp, PaymentType } from '../../Props/TransactionProp';
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/deleteAccountPopup.scss";

interface TransactionDetailsPopupProps {
  transaction: TransactionProp | null;
  onClose: () => void;
  onDelete: (transactionId: string, transactionType: string) => void; 
}

const TransactionDetailsPopup: React.FC<TransactionDetailsPopupProps> = ({ transaction, onClose, onDelete }) => {
  if (!transaction) return null;

  const handleDelete = () => {
    if (transaction) {
      console.log("Deleting transaction:", transaction.id);
      console.log("Transaction type:", transaction.type);
      console.log("Transaction type enum:", PaymentType.Expense);
      const transactionType = transaction.type === PaymentType.Expense ? "expense" : "income";
      onDelete(transaction.id, transactionType);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup transaction-details">
        <h2>Tranzakció Részletei</h2>
        <p><strong>Id:</strong> {transaction.id}</p>
        <p><strong>Összeg:</strong> {transaction.total} {transaction.currency}</p>
        <p><strong>Típus:</strong> {transaction.type === PaymentType.Expense ? 'Kiadás' : 'Bevétel'}</p>
        <p><strong>Kategória:</strong> {transaction.category}</p>
        <p><strong>Leírás:</strong> {transaction.description || 'Nincs megadva'}</p>
        <p><strong>Létrehozva:</strong> {new Date(transaction.createdAt).toLocaleString()}</p>
        <p><strong>Módosítva:</strong> {new Date(transaction.updatedAt).toLocaleString()}</p>
        <div className="buttons">
          <button className="primary" onClick={onClose}>
            Bezárás
          </button>
          <button className="secondary" onClick={handleDelete}>
            Törlés
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPopup;