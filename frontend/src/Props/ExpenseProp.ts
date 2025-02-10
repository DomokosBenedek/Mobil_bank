export interface Expense {
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
    Shopping,
    Rent,
    Transport,
    Transaction,
    Other
}

enum Metric {
    Day,
    Week,
    Month,
    Year
  }