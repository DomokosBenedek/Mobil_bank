import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CostumeNavbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import Toast, { showToast } from "../components/common/CustomToast";
import { User } from "../components/Props/UserProp";
import "../design/pages/regist.scss";

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

    const [passwordCriteria, setPasswordCriteria] = useState({
        hasLowercase: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false,
        isLongEnough: false,
    });

    const [isPasswordActive, setIsPasswordActive] = useState(false); // Új állapot a mező aktivitásához
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "password") {
            setPasswordCriteria({
                hasLowercase: /[a-z]/.test(value),
                hasUppercase: /[A-Z]/.test(value),
                hasNumber: /\d/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
                isLongEnough: value.length >= 8,
            });
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("A jelszavak nem egyeznek.");
            return;
        }

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError("Minden mező kitöltése kötelező.");
            return;
        }

        const newUser: User = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Hiba a regisztráció során.");
                return;
            }

            showToast("Sikeres regisztráció!");
            setError(null);
            navigate("/"); // Navigálás a főoldalra regisztráció után
        } catch (error) {
            setError("Hálózati hiba történt.");
        }
    };

    return (
        <>
            <header>
                <CostumeNavbar />
            </header>
            <main className="register-main">
                <section>
                    <div className="register-container">
                        <h2>Regisztráció</h2>
                        <form onSubmit={handleSubmit} className="register-form">
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
                                    className="form-input register"
                                />
                            </div>
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
                                    className="form-input register"
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
                                    className="form-input register"
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
                                    onFocus={() => setIsPasswordActive(true)} // Aktiválás
                                    onBlur={() => setIsPasswordActive(formData.password !== "")} // Deaktiválás, ha üres
                                    required
                                    className="form-input register"
                                />
                                {isPasswordActive && ( // Feltételes megjelenítés
                                    <div className="password-criteria">
                                        <p style={{ color: passwordCriteria.hasLowercase ? "green" : "darkblue" }}>
                                            {passwordCriteria.hasLowercase ? "✔" : "✖"} Kisbetű
                                        </p>
                                        <p style={{ color: passwordCriteria.hasUppercase ? "green" : "darkblue" }}>
                                            {passwordCriteria.hasUppercase ? "✔" : "✖"} Nagybetű
                                        </p>
                                        <p style={{ color: passwordCriteria.hasNumber ? "green" : "darkblue" }}>
                                            {passwordCriteria.hasNumber ? "✔" : "✖"} Szám
                                        </p>
                                        <p style={{ color: passwordCriteria.hasSpecialChar ? "green" : "darkblue" }}>
                                            {passwordCriteria.hasSpecialChar ? "✔" : "✖"} Speciális karakter
                                        </p>
                                        <p style={{ color: passwordCriteria.isLongEnough ? "green" : "darkblue" }}>
                                            {passwordCriteria.isLongEnough ? "✔" : "✖"} Legalább 8 karakter
                                        </p>
                                    </div>
                                )}
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
                                    className="form-input register"
                                />
                            </div>
                            {error && <p className="error-message register">{error}</p>}
                            <button type="submit" className="primary_v1 register">
                                Regisztráció
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <footer>
                <Footer />
            </footer>
            <Toast />
        </>
    );
}