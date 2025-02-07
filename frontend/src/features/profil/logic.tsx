import { useEffect, useState } from "react";
import { Account } from "../../Props/AccountProp";
import { User } from "../../Props/UserProp";

export const logicks = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userID] = useState<string | null>(localStorage.getItem("UserId"));
  const [userToken] = useState<string | null>(localStorage.getItem("Token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAccount, setActiveAccount] = useState<Account | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

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

  const handleCardClick = (account: Account) => {
    setActiveAccount(account);
    localStorage.setItem("activeAccountId", account.id);
  };

  const addNewAccount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/accounts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({ userId: userID }),
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

  return { user, loading, error, activeAccount, handleCardClick, addNewAccount };
};
