import { Account } from "./Account";
import { User } from "./User";

export interface Expense {
    id: string;
    total: number;
    category: Category;
    vendor?: string;
    description: string;
    User: User;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    Account: Account;
    accountId: string;
    repeatAmmount: number;
    repeatMetric:  Metric;
    repeatStart:   Date;
    repeatEnd:     Date;
}

enum Category {
    Food,
    Rent,
    Transport,
    Other
}

enum Metric {
    Day,
    Week,
    Month,
    Year
  }