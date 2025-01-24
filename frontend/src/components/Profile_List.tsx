import React, { useEffect, useState } from 'react';
import { User } from '../User';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('../test_users.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
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
    <div>
      <h2>Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id as React.Key}>
            {user.firstName} {user.lastName} ({user.role})
          </li>
        ))}
      </ul>

     
    </div>
  );
};

export default App;
