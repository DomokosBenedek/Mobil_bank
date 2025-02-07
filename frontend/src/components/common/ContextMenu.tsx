import { ContextMenuProps } from "../../Props/ContextMenuProp";

const ContextMenu: React.FC<ContextMenuProps> = ({
    contextMenu,
    onDelete,
    onAddPayment,
    onAddUser,
}) => {
  if (!contextMenu.visible) return null;

  return (
    <ul
      style={{
        position: "absolute",
        top: contextMenu.y,
        left: contextMenu.x,
        backgroundColor: "white",
        border: "1px solid black",
        listStyle: "none",
        padding: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        zIndex: 1000,
      }}
    >
      <li 
        style={{ padding: "5px", cursor: "pointer" }}
        onClick={() => onAddPayment(contextMenu.selectedCardId)}
      >
        Add Payment
      </li>
      <li 
        style={{ padding: "5px", cursor: "pointer" }}
        onClick={() => onAddUser(contextMenu.selectedCardId)}
      >
        Add User
      </li>
      <li 
        style={{ padding: "5px", cursor: "pointer", color: "red" }}
        onClick={() => onDelete(contextMenu.selectedCardId)}
      >
        Delete Card
      </li>
    </ul>
  );
};

export default ContextMenu;
