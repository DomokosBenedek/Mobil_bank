import { useEffect, useState } from "react";
import { Account } from "../../Props/AccountProp";
import { User } from "../../Props/UserProp";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }

    {/*Kártyák kilistázása*/}
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/accounts/all/${userID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userToken,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch accounts");
        const data = await response.json();
        setUser((prevUser) => (prevUser ? { ...prevUser, Accounts: data } : null));

        const storedActiveAccountId = localStorage.getItem("activeAccountId");
        if (data.length > 0) {
          const selectedAccount =
            data.find((acc: Account) => acc.id === storedActiveAccountId) || data[0];
          setActiveAccount(selectedAccount);
          localStorage.setItem("activeAccountId", selectedAccount.id);
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [userID, userToken]);

  
  const SetActiveAcountClick = (account: Account) => {
    setActiveAccount(account);
    localStorage.setItem("activeAccountId", account.id);
  };

  {/*Új kártya létrehozása*/}
  const addNewAccount = async () => {
    console.log(userToken);
    console.log(userID);
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
    } catch (error) {
      setError((error as Error).message);
    }
  };

  {/*Logout*/}
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

  {/*Login*/}
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

  return (
    {
      user,
      loading,
      error,
      activeAccount,
      SetActiveAcountClick,
      addNewAccount,
      logout,
      isHovered,
      setIsHovered,
      email,
      setEmail,
      password,
      setPassword,
      isLoggedIn,
      handleSubmit
    }
  );
};
