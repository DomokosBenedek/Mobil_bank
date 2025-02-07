import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Props/UserProp";
import { Icon_Profil_circle } from "./img";
import "../../design/common/LoginDropdown.css";

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
        console.log(userData);
        console.log(userData.access_token);
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

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    navigate(`/`, { state: { user } });
    localStorage.removeItem("loggedInUser");
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.firstName}${user.lastName}`, { state: { user } });
      console.log(user.firstName + " " + user.lastName  + " átküldés")
    }
  };

  return (
    <div
      className="login-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoggedIn && user ? (
        <>
          <div className="profile-button" onClick={handleProfileClick}>
            <img src={Icon_Profil_circle} alt="Profil" className="profile-image" />
            <span>{user.firstName} {user.lastName}</span>
          </div>
          {isHovered && (
            <div className="profile-dropdown">
              <span>{user.firstName} {user.lastName}</span>
              <button className="primary_v1" onClick={handleLogout}>Kilépés</button>
            </div>
          )}
        </>
      ) : (
        <>
          <button className="login-button">Bejelentkezés</button>
          {isHovered && (
            <div className="login-dropdown">
              <h2 className="alter">Login</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  //type="email"
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
                <button type="button" className="primary_v3" onClick={() => navigate("/regist")}>
                  Regisztráció
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}
