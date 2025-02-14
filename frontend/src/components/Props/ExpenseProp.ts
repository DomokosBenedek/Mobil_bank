import { Transaction, Category } from "./TransactionProp";

export interface Expense extends Transaction {
    category: Category.Shopping | Category.Rent | Category.Transport | Category.Transaction | Category.Other;
}

