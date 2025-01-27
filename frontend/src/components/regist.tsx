import { FormEvent, useState } from "react";
import Footer from "./Footer";
import CostumeNavbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { User } from "../User.ts";

export default function Register() {

    interface RegistrationFormState {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
      }

    const [formData, setFormData] = useState<RegistrationFormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    
  
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
  
      const { firstName, lastName, email, password, confirmPassword } =
        formData;
  
      if (password !== confirmPassword) {
        setError("A jelszavak nem egyeznek.");
        return;
      }
  
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        setError("Minden mező kitöltése kötelező.");
        return;
      }
  
      setError(null);
      console.log("Regisztráció sikeres", formData);
      navigate("/profile", {
        state: { email, firstName, lastName },
      });
    };
    return (
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main>
                <section>
                <div className="register-container">
                    <h2>Regisztráció</h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="firstName">Keresztnév</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Keresztnév"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Vezetéknév</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Vezetéknév"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email cím</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email cím"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Jelszó</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Jelszó"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Jelszó újra</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Jelszó újra"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="form-submit">
                            Regisztráció
                        </button>
                    </form>
                </div>

                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};