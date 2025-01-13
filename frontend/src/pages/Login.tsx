import { useState } from "react";
import { loginUser } from "../services/authServices";
import { AxiosError } from "axios";
import { useHandleNavigation } from "../utils/navigationUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleNavigation = useHandleNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Du måste fylla i både e-post och användarnamn.");
      return;
    }

    try {
      const userData = await loginUser(email, password);
      console.log("Inloggad som: ", userData);
      //Navigate to new page
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.message);
      } else {
        setError("Fel användarnamn eller lösenord.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">
          Logga in
        </button>
      </form>
      <div aria-live="polite">
        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>

      <div className="create-user-wrapper">
        <p>Har du inte ett konto?</p>
        <button
          onClick={() => handleNavigation("/signup")}
          className="signup-button"
          aria-label="Skapa ett konto om du inte redan har ett."
        >
          Skapa konto
        </button>
      </div>
    </div>
  );
};

export default Login;
