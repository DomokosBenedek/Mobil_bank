import { Expense } from "./Expense";
import { Income } from "./Income";
import { User } from "./User";

export interface Account {
    id: string; 
    Users: User[];
    userId: string[];
    total: number;
    Expenses: Expense[];
    Incomes: Income[];
    createdAt: Date;  
    updatedAt: Date;
    currency:  Currency;  
}
enum Currency {
    HUF
}