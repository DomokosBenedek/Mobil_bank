import { Account } from "./AccountProp";
import { Expense } from "./ExpenseProp";
import { Income } from "./IncomeProp";

export interface User {
    id?: String;
    firstName: String;
    lastName: String;
    role?: UserType;
    email: String;
    password: String;
    Expenses?:  Expense[];
    Incomes?:   Income[];
    createdAt?: Date;
    updatedAt?: Date;
    Accounts?:     Account[];
    accountId?:    String[];
    access_token?: String;
}
enum UserType {
    Admin,
    User
  }