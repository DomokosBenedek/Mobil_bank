import { Expense } from "./ExpenseProp";
import { Income } from "./IncomeProp";
import { User } from "./UserProp";


export interface AccountProp {
    id: string; 
    Users: User[];
    userId: string[];
    total: number;
    Expenses: Expense[];
    Incomes: Income[];
    createdAt: Date;  
    updatedAt: Date;
    currency:  Currency;  
    ownerName: string;
    ownerId: string;
}
enum Currency {
    HUF
}