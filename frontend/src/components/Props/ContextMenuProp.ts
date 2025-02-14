interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    selectedCardId: string | null;
  }
  
  interface ContextMenuProps {
    contextMenu: ContextMenuState;
    onDelete: (cardId: string | null) => void;
    onAddPayment: (cardId: string | null) => void;
    onAddUser: (cardId: string | null) => void;
  }
  
  export type { ContextMenuState, ContextMenuProps };
  