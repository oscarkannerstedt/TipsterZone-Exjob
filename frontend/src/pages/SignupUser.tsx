import { useState } from "react";
import { createUser } from "../services/authServices";
import { AxiosError } from "axios";
import { useHandleNavigation } from "../utils/navigationUtils";

const SignupUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleNavigation = useHandleNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("Alla fält måste fyllas i.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    try {
      await createUser({ username, email, password });
      setSuccess("Användaren har skapats.");

      handleNavigation("/login");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.error);
      } else {
        setError("Ett fel inträffade vid skapandet av användaren.");
      }
    }
  };

  return (
    <div className="signup-wrapper">
      <h1>Skapa konto</h1>
      <form onSubmit={handleSubmit}>
        <div className="username-wrapper">
          <label htmlFor="username">Användarnamn</label>
          <input
            id="username"
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="email-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="password-wrapper">
          <label htmlFor="password">Lösenord</label>
          <input
            id="password"
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="confirmpassword-wrapper">
          <label htmlFor="confirmPassword">Bekräfta lösenord</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Skapa konto
        </button>
      </form>

      <div aria-live="polite">
        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {success && (
          <p role="alert" style={{ color: "green" }}>
            {success}
          </p>
        )}
      </div>

      <div className="login-user-wrapper">
        <p>Har du redan ett konto?</p>
        <button
          onClick={() => handleNavigation("/login")}
          className="login-button"
          aria-label="Logga in om du redan har ett konto"
        >
          Logga in här
        </button>
      </div>
    </div>
  );
};

export default SignupUser;
