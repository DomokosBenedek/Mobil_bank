import React from 'react';
import { logicks } from '../logic';

interface DeleteAccountPopupProps {
  onClose: () => void;
  onDelete: () => void;
  onDisconnect: () => void;
}

const DeleteAccountPopup: React.FC<DeleteAccountPopupProps> = ({ onClose, onDelete, onDisconnect }) => {
  const { deleteAccount ,disconnectUser, user, activeAccount } = logicks();

  const handleAction = () => {
    if (activeAccount?.ownerId === user?.id) {
      onDelete();
    } else {
      onDisconnect();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{activeAccount?.userId[0] == user?.id ? 'Delete Account' : 'Disconnect from Account'}</h2>
        <p>{activeAccount?.userId[0] === user?.id ? 'Are you sure you want to delete this account?' : 'Are you sure you want to disconnect from this account?'}</p>
        <button onClick={handleAction}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;