import React, { useEffect, useState } from 'react';
import { User } from '../User';
import Footer from './Footer';
import CostumeNavbar from './navbar';
import { useNavigate } from 'react-router-dom';

const Profil: React.FC<{ id: string }> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('../test.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (

    <>
        <header>
            <CostumeNavbar/>
        </header>
        <main>
            <section>
            <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          <p><strong>Account IDs:</strong></p>
          <ul>
            {user.accountId.map((accountId) => (
              <li key={accountId as React.Key}>{accountId}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
            </section>
        </main>
        <footer>
            <Footer/>
        </footer>
    </>
  );
};

export default Profil;