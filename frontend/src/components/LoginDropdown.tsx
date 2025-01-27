import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../design/loginDropdown.css";

export default function LoginDropdown() {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate("/Profile/"+{email}, { state: { email, password } });
  };

  return (
    <div
      className="login-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
              onChange={(e) => setEmail(e.target.value)} // Email mező értékének kezelése
              required
            />
            <input
              type="password"
              placeholder="Jelszó"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Jelszó értékének kezelése
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
    </div>
  );
}
