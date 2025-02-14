import { useEffect, useState } from "react";
import { Account } from "../Props/AccountProp";
import { User } from "../Props/UserProp";
import { useNavigate } from "react-router-dom";
import { Income } from "../Props/IncomeProp";
import { Expense } from "../Props/ExpenseProp";
import { PaymentType, Transaction } from "../Props/TransactionProp";

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
      if (!response.ok){
        setExpenses([]);
      };;
      const text = await response.text();
      if (!text) {
        setExpenses([]);
      } else {
        const data = JSON.parse(text);
        setExpenses(data);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  const fetchIncomes = async (accountId: string) => {
    try {
      console.log("fetchIncomes Token: " + userToken);
      const response = await fetch(`http://localhost:3000/accounts/allin/${accountId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
      });
      if (!response.ok){
        setIncomes([]);
      };
      const text = await response.text();
      if (!text) {
        setIncomes([]);
      } else {
        const data = JSON.parse(text);
        setIncomes(data);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };
  
  const SetActiveAcountClick = (account: Account) => {
    setActiveAccount(account);
    localStorage.setItem("activeAccountId", account.id);
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
  localStorage.removeItem("loggedInUser");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Token");
    localStorage.removeItem("activeAccountId");
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
      const response = await fetch(`http://localhost:3000/accounts/user/${accountId}`, {
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
    setActiveAccount(null);
    localStorage.removeItem("activeAccountId");
  } catch (error) {
      setError((error as Error).message);
    }
  };
  
  // Add income
  const addIncome = async (accountId: string, amount: number) => {
    // Implement the logic to add income
  };
  
  // Add expense
  const addExpense = async (accountId: string, amount: number) => {
    // Implement the logic to add expense
  };
  
  // Add user to account
  const addUserToAccount = async (accountId: string, userId: string) => {
    // Implement the logic to add user to account
  };

  const updateUser = async ( firstName: String, lastName: String, email: String, password: String) => {
    // Implement the logic to add user to account
  };

  const getAllPayments = () => {
    let x: any[] = [];
    if(expenses.length > 0){
      expenses.forEach((ex) => {
        x.push({ ...ex, PaymentType: "Expense" });
      });
    }
    if(incomes.length > 0){
      incomes.forEach((incom) => {
        x.push({ ...incom, PaymentType: "Income" });
      });
    }
    return x;
  };

  useEffect(() => {
    if (activeAccount) {
      console.log("user token: " +userToken);
      fetchIncomes(activeAccount.id).then(() => fetchExpenses(activeAccount.id).then(() => getAllPayments()));
      //fetchExpenses(activeAccount.id);
      //getAllPayments(); 
    }
  }, [activeAccount])
  
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
    user,
    loading,
    error,
    activeAccount,
    incomes,
    expenses,
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
    getAllPayments,
  };
};