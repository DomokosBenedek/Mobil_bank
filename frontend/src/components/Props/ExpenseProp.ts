import { TransactionProp, Category } from "./TransactionProp";

export interface Expense extends TransactionProp {
    repeatAmmount?: number;
    repeatMetric?: Metric;
    repeatStart?: Date;
    repeatEnd?: Date;
    name?: string;
    category: Category.Shopping | Category.Rent | Category.Transport | Category.Transfer | Category.Transaction | Category.Other;
}

export enum Metric {
    Day,
    Week,
    Month,
    Year
}
