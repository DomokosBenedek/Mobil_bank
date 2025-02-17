import React, { useState } from 'react';

interface NewUserPopupProps {
  onClose: () => void;
  onSave: (email: string) => void;
}

const NewUserPopup: React.FC<NewUserPopupProps> = ({ onClose, onSave }) => {
  const [email, setEmail] = useState<string>('');

  const handleSave = () => {
    onSave(email);
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add New User</h2>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NewUserPopup;