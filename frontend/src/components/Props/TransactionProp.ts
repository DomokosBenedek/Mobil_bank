export interface TransactionProp {
    id: string;
    total: number;
    category: Category;
    description?: string;
    currency: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    type: PaymentType;
}

export enum Category {
    Salary,
    Transaction,
    Other,
    Shopping,
    Rent,
    Transport,
    Transfer
}

export enum PaymentType {
    Expense,
    Incopme,
}
export enum Currency {
    HUF,
}