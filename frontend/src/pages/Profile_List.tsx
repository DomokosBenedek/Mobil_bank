import { useEffect, useState } from "react";
import { User } from "../components/common/Props/UserProp";
import CostumeNavbar from "../components/common/navbar";
import Footer from "../components/common/Footer";

const Profile_List: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        fetch('../testUsers.json')
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
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main>
                <section>
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
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default Profile_List;