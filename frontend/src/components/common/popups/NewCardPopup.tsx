import React, { useState } from "react";
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/newCardPopup.scss";

interface NewCardPopupProps {
  onClose: () => void;
  onSave: (cardName: string) => void;
}

const NewCardPopup: React.FC<NewCardPopupProps> = ({ onClose, onSave }) => {
  const [cardName, setCardName] = useState<string>("");

  const handleSave = () => {
    onSave(cardName);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup new-card">
        <h2>Szeretne egy új számlát létrehozni?</h2>
        <button className="primary" onClick={handleSave}>
          Igen
        </button>
        <button className="secondary" onClick={onClose}>
          Nem
        </button>
      </div>
    </div>
  );
};

export default NewCardPopup;