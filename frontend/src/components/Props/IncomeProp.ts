import { Transaction, Category } from "./TransactionProp";

export interface Income extends Transaction {
    category: Category.Salary | Category.Transaction | Category.Other;
}
