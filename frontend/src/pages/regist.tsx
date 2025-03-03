import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../components/Props/UserProp";
import CostumeNavbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import Toast, { showToast } from "../components/common/CustomToast";
import '../design/pages/regist.css'

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

        const newUser: User = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        console.log(newUser);

        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }).then((response) => {
            if (!response.ok) {
                setError("Hiba a regisztráció során.");
            }else{
                return response.json();
            }
        });
    
        setError(null);
        console.log("Regisztráció sikeres", formData);
        //navigate("/");

        fetch("http://localhost:3000/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }).then((response) => {
            if (!response.ok) {
                setError("Hiba a regisztráció során.");
            } else {
                showToast("Sikeres regisztráció!");
                return response.json();
            }
        });

    };
    return (
        <>
            <header>
                <CostumeNavbar/>
            </header>
            <main className="register-main">
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
                                type="text"
                                //type="email"
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
                        <button type="submit" className="primary_v1">
                            Regisztráció
                        </button>
                    </form>
                </div>

                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
            <Toast/>
        </>
    );
};