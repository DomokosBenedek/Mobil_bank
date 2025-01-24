import React, { useEffect, useState } from 'react';
import { User } from '../User';
import { Income } from '../Income';
import { Expense } from '../Expense';
import { Account } from '../Account';

const Test: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('../test.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setIncomes(data.incomes);
        setExpenses(data.expenses);
        setAccounts(data.accounts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={String(user.id)}>
            {user.firstName} {user.lastName} ({user.role})
          </li>
        ))}
      </ul>

      <h2>Incomes:</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.description}: {income.total} {income.category}
          </li>
        ))}
      </ul>

      <h2>Expenses:</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: {expense.total} {expense.category}
          </li>
        ))}
      </ul>

      <h2>Accounts:</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            Account ID: {account.id}, Total: {account.total} {account.currency}
            <ul>
              <li>
                Users:
                {account.Users.map((user) => (
                  <span key={String(user.id)}>{user.firstName} </span>
                ))}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;