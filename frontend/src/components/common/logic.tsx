import { useEffect, useState } from "react";
import { Account } from "../Props/AccountProp";
import { User } from "../Props/UserProp";
import { useNavigate } from "react-router-dom";
import { Income } from "../Props/IncomeProp";
import { Expense } from "../Props/ExpenseProp";
import { Category, Metric, PaymentType, Transaction } from "../Props/TransactionProp";

export const logicks = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userID] = useState<string | null>(localStorage.getItem("UserId"));
  const [userToken] = useState<string | null>(localStorage.getItem("Token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();
  const [activeUserAccounts, SetActiveUserAcounts] = useState<Account[] | null>(null);
  const [payments, setPayments] = useState<any[]>([]);

  const fetchAccounts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/all/${userID}`, {
        method: 'GET',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + userToken,
        }
      });
      if (!response.ok) throw new Error('Failed to fetch accounts');
      const data = await response.json();
      SetActiveUserAcounts(data);
      setUser(prevUser => prevUser ? { ...prevUser, Accounts: data } : null);
      const storedActiveAccountId = localStorage.getItem('activeAccountId');
      if (data.length > 0) {
        const selectedAccount = data.find((acc: Account) => acc.id === storedActiveAccountId) || data[0];
        setActiveAccount(selectedAccount);
        localStorage.setItem('activeAccountId', selectedAccount.id);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenses = async (accountId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/allex/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
      });
      if (!response.ok) {
        setExpenses([]);
        return [];
      }
      const text = await response.text();
      if (!text) {
        setExpenses([]);
        return [];
      } else {
        const data = JSON.parse(text);
        setExpenses(data);
        return data;
      }
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchIncomes = async (accountId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/allin/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
      });
      if (!response.ok) {
        setIncomes([]);
        return [];
      }
      const text = await response.text();
      if (!text) {
        setIncomes([]);
        return [];
      } else {
        const data = JSON.parse(text);
        setIncomes(data);
        return data;
      }
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  const findone = async (accountId: string) => {
    try {
      const response = await fetch(`localhost:3000/accounts/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
      });
      const data = await response.json();
      setActiveAccount(data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const SetActiveAcountClick = (account: Account) => {
    setActiveAccount(account);
    localStorage.setItem("activeAccountId", account.id);
  };

  //Allpayment
  const allpayment = async () => {
        console.log('activeAccountId (kezdet): ' + activeAccount?.id);
        if (activeAccount) {
          let x: any[] = [];
          const expenses = await fetchExpenses(activeAccount.id);
          if (expenses.length > 0) {
            expenses.forEach((ex: any) => {
              x.push({ ...ex, PaymentType: "Expense" });
            });
          }
          const incomes = await fetchIncomes(activeAccount.id);
          if (incomes.length > 0) {
            incomes.forEach((incom: any) => {
              x.push({ ...incom, PaymentType: "Income" });
            });
          }
          setPayments(x);
          return x;
        }
      };
  
  // Add new account
  const addNewAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({
          userId: userID,
          total: 0,
          currency: "HUF",
          ownerName: user?.firstName + " " + user?.lastName,
        }),
      });
      if (!response.ok) throw new Error("Failed to create account");
      const newAccount = await response.json();
      setUser((prevUser) =>
        prevUser ? { ...prevUser, Accounts: [...(prevUser.Accounts || []), newAccount] } : null
    );
    setActiveAccount(newAccount);
    localStorage.setItem("activeAccountId", newAccount.id);
  } catch (error) {
    setError((error as Error).message);
  }
};

// Logout
const logout = () => {
  /*
  localStorage.removeItem("loggedInUser");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Token");
    localStorage.removeItem("activeAccountId");
    */
    setUser(null);
    setActiveAccount(null);
    setIsLoggedIn(false);
    navigate(`/`);
  };
  
  // Login
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      return response.json();
    })
    .then((userData: User) => {
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      if (userData.access_token) {
        localStorage.setItem("Token", userData.access_token as string);
      }
      if (userData.id) {
        localStorage.setItem("UserId", userData.id as string);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
  
  // Delete account
  const deleteAccount = async (accountId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/${accountId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
      });
      if (!response.ok) throw new Error("Failed to delete account");
      setUser((prevUser) =>
        prevUser ? { ...prevUser, Accounts: prevUser.Accounts?.filter(account => account.id !== accountId) } : null
    );
    setActiveAccount(user?.Accounts?.[0] || null);
    localStorage.removeItem("activeAccountId");
  } catch (error) {
      setError((error as Error).message);
    }
  };
  
  // Add income
  const addIncome = async (accountId: string, amount: number, category: String, description: String,  repeatAmount: number, repeatMetric: String) => {
    try {
      const response = await fetch(`http://localhost:3000/income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({
          total: amount,
          category,
          userId: userID,
          bankAccountId: accountId,
          description,
          repeatAmount,
          repeatMetric,
          repeatStart: new Date(),
          repeatEnd: new Date(),
        }),
      });
      if (!response.ok) throw new Error("Failed to add income");
      const newIncome = await response.json();
      setIncomes((prevIncomes) => [...prevIncomes, newIncome]);
      return incomes;
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  // Add expense
  const addExpense = async (accountId: string, amount: number, category: String, description: String,  repeatAmount: number, repeatMetric: String) => {
    try {
      const response = await fetch(`http://localhost:3000/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({
          total: amount,
          category,
          userId: userID,
          bankAccountId: accountId,
          description,
          repeatAmount,
          repeatMetric,
          repeatStart: new Date(),
          repeatEnd: new Date(),
        }),
      });
      if (!response.ok) throw new Error("Failed to add expense");
      const newExpense = await response.json();
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  // Add user to account
  const addUserToAccount = async (accountId: string, email: string) => {
    console.log('accountId: ' + accountId);
    console.log('userToken: ' + userToken);
    console.log('email: ' + email);
    try {
      const response = await fetch(`http://localhost:3000/accounts/user/email/${accountId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok) throw new Error("Failed to add user to account");
      const data = await response.json();
      return data;
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const updateUser = async ( firstName: String, lastName: String, email: String, password: String) => {
    // Implement the logic to add user to account
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  
    if (userID && userToken) {
      fetchAccounts();
    }

  }, [userID, userToken]);


  return {
    fetchExpenses,
    fetchIncomes,
    findone,
    user,
    loading,
    error,
    activeAccount,
    updateUser,
    fetchAccounts,
    SetActiveAcountClick,
    addNewAccount,
    deleteAccount,
    addIncome,
    addExpense,
    addUserToAccount,
    logout,
    isHovered,
    setIsHovered,
    email,
    setEmail,
    password,
    setPassword,
    isLoggedIn,
    handleSubmit,
    allpayment
  };
};