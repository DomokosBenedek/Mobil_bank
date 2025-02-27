interface ContextMenuState {
    visible: boolean;
    x: number;
    y: number;
    selectedCardId: string | null;
  }
  
  interface ContextMenuProp {
    contextMenu: ContextMenuState;
    onAddPayment: (cardId: string | null) => void;
    onAddUser: (cardId: string | null) => void;
    onDelete: (cardId: string | null) => void;
  }
  
  export type { ContextMenuState, ContextMenuProp };
  