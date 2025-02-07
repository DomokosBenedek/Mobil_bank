import React from 'react';
import '../../design/common/CardContextMenu.css';

interface CardContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onDelete: () => void;
  onAddIncome: () => void;
  onAddExpense: () => void;
  onAddUser: () => void;
}

const CardContextMenu: React.FC<CardContextMenuProps> = ({ x, y, onClose, onDelete, onAddIncome, onAddExpense, onAddUser }) => {
  return (
    <div className="context-menu" style={{ top: y, left: x }} onMouseLeave={onClose}>
      <ul>
        <li onClick={onDelete}>Delete Card</li>
        <li onClick={onAddIncome}>Add Income</li>
        <li onClick={onAddExpense}>Add Expense</li>
        <li onClick={onAddUser}>Add User</li>
      </ul>
    </div>
  );
};

export default CardContextMenu;