import React from 'react';
import { logicks } from '../logic';
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/deleteAccountPopup.scss";

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
      <div className="popup delete-account">
        <h2>{activeAccount?.userId[0] == user?.id ? 'Számla törlése' : 'Leválasztom magam a számláról'}</h2>
        <p>{activeAccount?.userId[0] === user?.id ? 'Biztosan törölni szeretnéd ezt a számlát?' : 'Biztosan le szeretnél válni erről a számláról?'}</p>
        <button onClick={handleAction} className='primary'>Igen</button>
        <button onClick={onClose} className='secundary'>Nem</button>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;