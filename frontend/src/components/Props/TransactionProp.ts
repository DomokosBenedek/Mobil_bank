export interface TransactionProp {
    id: string;
    total: number;
    category: Category;
    vendor?: string;
    description?: string;
    currency: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    repeatAmmount: number;
    repeatMetric: Metric;
    repeatStart: Date;
    repeatEnd: Date;
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

export enum Metric {
    Day,
    Week,
    Month,
    Year
}

export enum PaymentType {
    Expense,
    Incopme,
}
export enum Currency {
    HUF,
}