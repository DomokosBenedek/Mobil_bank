import { TransactionProp, Category } from "./TransactionProp";

export interface Expense extends TransactionProp {
    category: Category.Shopping | Category.Rent | Category.Transport | Category.Transfer | Category.Transaction | Category.Other;
}

