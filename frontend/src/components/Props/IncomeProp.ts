import { TransactionProp, Category } from "./TransactionProp";

export interface Income extends TransactionProp {
    category: Category.Salary | Category.Transfer | Category.Transaction | Category.Other;
}
