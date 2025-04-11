import React, { useState, useEffect } from "react";
import { logicks } from "../../common/logic";
import { useNavigate } from "react-router-dom";
import "../../../design/profil_page_element/profile.scss";

const Profil_Page: React.FC = () => {
  const { user, activeUserAccounts } = logicks();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // UseEffect to set initial values from user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName?.toString() || "");
      setLastName(user.lastName?.toString() || "");
      setEmail(user.email?.toString() || "");
    }
  }, [user]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Az azonosító kimásolva a vágólapra!");
      })
      .catch(() => {
        alert("Hiba történt a másolás során.");
      });
  };

  return (
    <main className="profile-page">
      <div className="profile-main-profile">
        <div className="profile-container-profile">
          <h2>Profil</h2>

          {/* User Data Section */}
          <section className="profile-section-user">
            <h3>Felhasználói adatok</h3>
            <div className="form-group-profile">
              <label>Vezetéknév</label>
              <p>{firstName}</p>
            </div>
            <div className="form-group-profile">
              <label>Keresztnév</label>
              <p>{lastName}</p>
            </div>
            <div className="form-group-profile">
              <label>Email</label>
              <p>{email}</p>
            </div>
            <button
              className="primary-button-profile"
              onClick={() => navigate("/commingsoon")}
            >
              Jelszó módosítás
            </button>
          </section>

          <section className="profile-section-szamlak">
            <h3>Számla adatok</h3>
            {activeUserAccounts?.length ? (
              <div className="account-list">
                {activeUserAccounts.map((account) => (
                  <div className="account-card" key={account.id}>
                    <h4>Számla tulajdonos neve: {account.ownerName}</h4>
                    <p>
                      <strong>Egyenleg:</strong> {account.total}{" "}
                      {account.currency}
                    </p>
                    <p>
                      <strong>id:</strong>{" "}
                      {"*".repeat(account.id.length - 4) + account.id.slice(-4)}
                    </p>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(account.id)}
                    >
                      Id Másolása
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nincsenek elérhető számlák.</p>
            )}
          </section>

          {/* Additional Information Section */}
          <section className="profile-section-profile">
            <h3>Egyéb információk</h3>
            <p>Ide kerülhetnek további adatok vagy funkciók.</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profil_Page;
