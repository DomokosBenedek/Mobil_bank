import { useEffect, useState } from "react";
import { User } from "../Props/UserProp";
import { useNavigate } from "react-router-dom";
import { Income } from "../Props/IncomeProp";
import { Expense } from "../Props/ExpenseProp";
import { AccountProp } from "../Props/AccountProp";
import { Api } from "../Props/ApiProp";
import { TransferProp } from "../Props/TransferProp";
import { showToast } from "./CustomToast";

export const logicks = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userID] = useState<string | null>(localStorage.getItem("UserId"));
  const [userToken] = useState<string | null>(localStorage.getItem("Token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<AccountProp | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigate = useNavigate();
  const [activeUserAccounts, SetActiveUserAcounts] = useState<AccountProp[] | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loginError, setLoginError] = useState<string | null>(null); // Add this line

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
        const selectedAccount = data.find((acc: AccountProp) => acc.id === storedActiveAccountId) || data[0];
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

  const SetActiveAcountClick = (account: AccountProp) => {
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
        showToast("Sikeres fiók létrehozás!");
    } catch (error) {
        setError((error as Error).message);
    }
};

// Logout
const logout = async () => {
    navigate("/", { replace: true }); // Navigate to the home page first
    setIsLoggedIn(false);
    setActiveAccount(null);
    setUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("UserId");
    localStorage.removeItem("Token");
    localStorage.removeItem("activeAccountId");
  };
  
  // Login
  const Login = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login");
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
            console.log("Token: " + userData.access_token);
        }
        if (userData.id) {
            localStorage.setItem("UserId", userData.id as string);
            console.log("UserId: " + userData.id);
        }
        showToast("Sikeres bejelentkezés!");
        setLoginError(null); // Clear the error message on successful login
        console.log("Login success");
    })
    .catch((error) => {
        console.error("Error:", error);
        setLoginError("Hibás email vagy jelszó"); // Set the error message on login failure
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
        showToast("Sikeres jövedelem hozzáadás!");
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
        showToast("Sikeres kiadás hozzáadás!");
    } catch (error) {
        setError((error as Error).message);
    }
};
  
  // Add user to account
  const addUserToAccount = async (accountId: string, email: string) => {
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
        showToast("Sikeres felhasználó hozzáadás a fiókhoz!");
        return data;
    } catch (error) {
        setError((error as Error).message);
    }
};

  const disconnectUser = async (accountId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/disconnect/${accountId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({ userId: userID }),
      });
      if (!response.ok) throw new Error("Failed to disconnect user");
      setUser((prevUser) =>
        prevUser ? { ...prevUser, Accounts: prevUser.Accounts?.filter(account => account.id !== accountId) } : null
      );
      setActiveAccount(user?.Accounts?.[0] || null);
      localStorage.removeItem("activeAccountId");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  //Api Beolvasás
  const fetchApiEur = async ( date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/eur.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const EurData: Api = {
        date: data.date,
        currency: "eur",
        changes: data.eur,
      };
      return EurData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  }

  const fetchApiUsd = async ( date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/usd.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const UsdData: Api = {
        date: data.date,
        currency: "usd",
        changes: data.usd,
      };
      return UsdData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  }

  const fetchApiAud = async ( date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/aud.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const AudData: Api = {
        date: data.date,
        currency: "aud",
        changes: data.usd,
      };
      return AudData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  }

  const fetchApiCad = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/cad.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const CadData: Api = {
        date: data.date,
        currency: "cad",
        changes: data.cad,
      };
      return CadData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiChf = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/chf.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const ChfData: Api = {
        date: data.date,
        currency: "chf",
        changes: data.chf,
      };
      return ChfData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiCzk = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/czk.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const CzkData: Api = {
        date: data.date,
        currency: "czk",
        changes: data.czk,
      };
      return CzkData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiGbp = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/gbp.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const GbpData: Api = {
        date: data.date,
        currency: "gbp",
        changes: data.gbp,
      };
      return GbpData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiHrk = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/hrk.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const HrkData: Api = {
        date: data.date,
        currency: "hrk",
        changes: data.hrk,
      };
      return HrkData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiJpy = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/jpy.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const JpyData: Api = {
        date: data.date,
        currency: "jpy",
        changes: data.jpy,
      };
      return JpyData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiNok = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/nok.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const NokData: Api = {
        date: data.date,
        currency: "nok",
        changes: data.nok,
      };
      return NokData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiPln = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/pln.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const PlnData: Api = {
        date: data.date,
        currency: "pln",
        changes: data.pln,
      };
      return PlnData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiRon = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/ron.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const RonData: Api = {
        date: data.date,
        currency: "ron",
        changes: data.ron,
      };
      return RonData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiRub = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const RubData: Api = {
        date: data.date,
        currency: "rub",
        changes: data.rub,
      };
      return RubData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiSek = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/sek.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const SekData: Api = {
        date: data.date,
        currency: "sek",
        changes: data.sek,
      };
      return SekData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };
  
  const fetchApiUah = async (date: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/uah.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const UahData: Api = {
        date: data.date,
        currency: "uah",
        changes: data.uah,
      };
      return UahData;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  const fetchApiCurrency = async (date: string, currency: string) => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`, {
        method: "GET",
      });
      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      const Data: Api = {
        date: data.date,
        currency: currency,
        changes: data[currency],
      };
      return Data;
    } catch (error) {
      setError((error as Error).message);
      return [];
    }
  };

  /* 
    eur
    usd
    aud
    cad
    chf
    czk
    gbp
    hrk
    jpy
    nok
    pln
    ron
    rub
    sek
    uah
    */

  const createRepeatableTransaction = async (accountId: string, amount: number, category: String, description: String, repeatAmount: number, repeatMetric: String, repeatStart: Date, repeatEnd: Date) => {
    try {
      const response = await fetch(`http://localhost:3000/repeatabletransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + userToken,
        },
        body: JSON.stringify({
          total: amount,
          category,
          description,
          repeatAmount,
          repeatMetric,
          repeatStart,
          repeatEnd,
          accountId,
          userId: userID,
        })
      });
      if (!response.ok) throw new Error("Failed to create repeatable transaction");
      const newTransaction = await response.json();
      showToast("Sikeres ismétlődő tranzakció hozzáadás!");
      return newTransaction;
    } catch (error) {
      setError((error as Error).message);
    }
  };

  //transfer
  const transfer = async (transferData: TransferProp) => {
    try {
        const response = await fetch(`http://localhost:3000/accounts/transfer`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer " + userToken,
            },
            body: JSON.stringify(transferData),
        });
        if (!response.ok) throw new Error("Failed to transfer");
        const data = await response.json();
        showToast("Sikeres átutalás!");
        return data;
    } catch (error) {
        setError((error as Error).message);
    }
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
    disconnectUser,
    fetchExpenses,
    fetchIncomes,
    findone,
    user,
    userID,
    loading,
    error,
    activeAccount,
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
    Login,
    allpayment,
    fetchApiEur,
    fetchApiUsd,
    fetchApiAud,
    fetchApiCad,
    fetchApiChf,
    fetchApiCzk,
    fetchApiGbp,
    fetchApiHrk,
    fetchApiJpy,
    fetchApiNok,
    fetchApiPln,
    fetchApiRon,
    fetchApiRub,
    fetchApiSek,
    fetchApiUah,
    transfer,
    userToken,
    loginError,
    setLoginError,
    createRepeatableTransaction,
    fetchApiCurrency,
  };
};