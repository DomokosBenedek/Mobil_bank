import React from "react";
import "../../../design/popups/defoultPopup.scss";

interface StopRepeatableTransactionPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const StopRepeatableTransactionPopup: React.FC<StopRepeatableTransactionPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup stop-transaction">
        <h2>Ismétlődő tranzakció leállítása</h2>
        <p>Biztosan le szeretnéd állítani ezt az ismétlődő tranzakciót?</p>
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

export default StopRepeatableTransactionPopup;