import { Account } from "./Account";
import { Expense } from "./Expense";
import { Income } from "./Income";

export interface User {
    id?: String;
    firstName: String;
    lastName: String;
    role?: UserType;
    email: String;
    password: String;
    Expenses:  Expense[];
    Incomes:   Income[];
    createdAt: Date;
    updatedAt: Date;
    Accounts:     Account[];
    accountId:    String[];
}
enum UserType {
    Admin,
    User
  }