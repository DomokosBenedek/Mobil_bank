import React, { useState } from 'react';
import { logicks } from '../logic';
import { TransferProp } from '../../Props/TransferProp';
import "../../../design/popups/defoultPopup.scss";
import "../../../design/popups/transferPopup.scss";

interface TransferPopupProps {
  onClose: () => void;
  onTransfer: (transferData: TransferProp) => void;
  activeAccountId: string;
  userId: String;
}

const TransferPopup: React.FC<TransferPopupProps> = ({ onClose, onTransfer}) => {
  const [accountto, setAccountto] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const { user, activeAccount } = logicks();

  if (!user || !activeAccount) {
    return <div>Error: User or Active Account not found</div>;
  }

  const handleTransfer = () => {
    if (!user.id) {
      return <div>Error: User ID not found</div>;
    }

    const transferData: TransferProp = {
      userId: user.id.toString(),
      accountfrom: activeAccount.id,
      accountto,
      amount,
    };
    onTransfer(transferData);
    window.location.reload();
  };

  return (
    <div className="popup-overlay">
      <div className="popup transfer">
        <h2>Átutalás</h2>
        <label>
          Cél számla:
          <input type="text" value={accountto} onChange={(e) => setAccountto(e.target.value)} />
        </label>
        <label>
          Összeg:
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <button className="primary" onClick={handleTransfer}>
          Átutalás
        </button>
        <button className="secondary" onClick={onClose}>
          Mégse
        </button>
      </div>
    </div>
  );
};

export default TransferPopup;