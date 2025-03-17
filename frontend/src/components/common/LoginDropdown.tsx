import { useNavigate } from "react-router-dom";
import { Icon_Profil_circle } from "./img";
import "../../design/common/LoginDropdown.css";
import { logicks } from "./logic";

export default function LoginDropdown() {
  const {
    loginError,
    setLoginError,
    user,
    isHovered,
    setIsHovered,
    email,
    setEmail,
    password,
    setPassword,
    isLoggedIn,
    Login,
    logout,
    fetchAccounts,
  } = logicks();
  
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      fetchAccounts();
      navigate(`/profile/${user.firstName}${user.lastName}/dashboard`, { state: { user } });
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setLoginError(null);
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
              <button className="primary_v1" onClick={logout}>Kilépés</button>
            </div>
          )}
        </>
      ) : (
        <>
          <button className="login-button">Bejelentkezés</button>
          {isHovered && (
            <div className="login-dropdown">
              <h2 className="alter">Bejelentkezés</h2>
              <form onSubmit={Login}>
                <input
                  type="text"
                  placeholder="Email cím"
                  className="login-input"
                  value={email}
                  onChange={(e) => handleInputChange(setEmail, e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Jelszó"
                  className="login-input"
                  value={password}
                  onChange={(e) => handleInputChange(setPassword, e.target.value)}
                  required
                />
                <div className="forgot-password">
                  <a href="#forgot">Elfelejtetted a jelszavad?</a>
                </div>
                {loginError && <div className="error-message">{loginError}</div>}
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