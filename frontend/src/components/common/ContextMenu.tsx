import React from 'react';
import '../../design/common/CardContextMenu.css';

interface CardContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onAddPayment: () => void;
  onAddUser: () => void;
  onTransfer: () => void;
}

const CardContextMenu: React.FC<CardContextMenuProps> = ({ x, y, onClose, onDelete, onAddPayment, onAddUser, onTransfer }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }} onMouseLeave={onClose}>
      <ul>
        <li onClick={onAddPayment}>Add Payment</li>
        <li onClick={onAddUser}>Add User</li>
        <li onClick={onTransfer}>Transfer</li>
        <li onClick={onDelete}>Delete Card</li>
      </ul>
    </div>
  );
};

export default CardContextMenu;