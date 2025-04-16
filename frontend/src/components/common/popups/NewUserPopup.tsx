import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importáljuk a toast-ot
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/newUserPopup.scss";

interface NewUserPopupProps {
  onClose: () => void;
  onSave: (email: string) => void;
}

const NewUserPopup: React.FC<NewUserPopupProps> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState<string>('');

  const checkEmailExists = async (email: string): Promise<boolean> => {
    return false;
  };

  const handleSave = async () => {
    const emailExists = await checkEmailExists(email);
    if (!emailExists) {
      toast.error("A megadott email nem létezik!"); 
      return;
    }
    onSave(email);
    window.location.reload();
  };

  return (
    <div className="popup-overlay">
      <div className="popup new-user">
        <h2>Új felhasználó hozzáadása</h2>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="primary" onClick={handleSave}>
          Mentés
        </button>
        <button className="secondary" onClick={onClose}>
          Mégse
        </button>
      </div>
    </div>
  );
};

export default NewUserPopup;