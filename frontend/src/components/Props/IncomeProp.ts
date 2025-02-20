import { Transaction, Category } from "./TransactionProp";

export interface Income extends Transaction {
    category: Category.Salary | Category.Transfer | Category.Transaction | Category.Other;
}
