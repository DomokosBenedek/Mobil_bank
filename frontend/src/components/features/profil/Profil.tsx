import React, { useState } from 'react'
import { logicks } from "../../common/logic";

const Profil_Page: React.FC = () => {
  const { user } = logicks();
  const [firstName, setFirstName] = useState<string>(user?.firstName?.toString() || "");
  const [lastName, setLastName] = useState<string>(user?.lastName?.toString() || "");
  const [email, setEmail] = useState<string>(user?.email?.toString() || "");
  const [password, setPassword] = useState("");

  const userName: string = `${user?.firstName ?? ''}${user?.lastName ?? ''}`.trim();

  return (
    <>
      <main className="profile-main-profil">
        <div className="profil-container">
          <h2>Profil</h2>
          <div className="profil-form">
            <div className="form-group">
              <label htmlFor="firstName">Keresztnév</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Vezetéknév</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Jellszó</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="primary_v3">Frissítés</button>
          </div>
        </div>
        </main>
    </>
  );
};

export default Profil_Page;