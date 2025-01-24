import { Account } from "./Account";
import { User } from "./User";

export interface Income {
    id: string;
    total: number;
    category: Category;
    vendor?: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
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