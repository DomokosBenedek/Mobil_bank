import React from 'react';

interface DeleteAccountPopupProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteAccountPopup: React.FC<DeleteAccountPopupProps> = ({ onClose, onDelete }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Delete Account</h2>
        <p>Are you sure you want to delete this account?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;