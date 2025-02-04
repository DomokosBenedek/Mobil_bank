import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../design/loginDropdown.css";
import { User } from "../User";

export default function LoginDropdown() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate(`/`, { state: { user } });
    localStorage.removeItem("loggedInUser");
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/Profile/${user.firstName}${user.lastName}`, { state: { user } });
    }
  };

  return (
    <div
      className="login-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoggedIn && user ? (
        <div className="profile-container">
          <button className="profile-button" onClick={handleProfileClick}>
            <img src={"/default-avatar.png"} alt="Profil" className="profile-image" />
            <span>{user.firstName} {user.lastName}</span>
          </button>
          {isHovered && (
            <div className="profile-dropdown">
              <button className="logout-button" onClick={handleLogout}>Kilépés</button>
            </div>
          )}
        </div>
      ) : (
        <>
          <button className="login-button">Bejelentkezés</button>
          {isHovered && (
            <div className="login-dropdown">
              <h2 className="alter">Login</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email cím"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Jelszó"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="forgot-password">
                  <a href="#forgot">Elfelejtetted a jelszavad?</a>
                </div>
                <button type="submit" className="login-submit primary_v1">
                  Bejelentkezés
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
