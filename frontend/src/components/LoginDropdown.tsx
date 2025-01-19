import React, { useState } from "react";
export default function LoginDropdown() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="login-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="login-button">Bejelentkezés</button>

      {isHovered && (
        <div className="login-dropdown">
          <h2>Login</h2>
          <form>
            <input
              type="email"
              placeholder="Email cím"
              className="login-input"
              required
            />
            <input
              type="password"
              placeholder="Jelszó"
              className="login-input"
              required
            />
            <div className="forgot-password">
              <a href="#forgot">Elfelejtetted a jelszavad?</a>
            </div>
            <button type="submit" className="login-submit">
              Bejelentkezés
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
