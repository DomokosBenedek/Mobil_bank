import React from "react";
import "../../../design/popups/defoultPopup.scss";

interface DeleteRepeatableTransactionPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteRepeatableTransactionPopup: React.FC<DeleteRepeatableTransactionPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup delete-transaction">
        <h2>Ismétlődő tranzakció törlése</h2>
        <p>Biztosan törölni szeretnéd ezt az ismétlődő tranzakciót?</p>
        <div className="buttons">
          <button className="primary" onClick={onConfirm}>
            Igen
          </button>
          <button className="secondary" onClick={onClose}>
            Nem
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRepeatableTransactionPopup;