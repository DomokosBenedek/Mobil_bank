import { Transaction, Category } from "./TransactionProp";

export interface Expense extends Transaction {
    category: Category.Shopping | Category.Rent | Category.Transport | Category.Transfer | Category.Transaction | Category.Other;
}

