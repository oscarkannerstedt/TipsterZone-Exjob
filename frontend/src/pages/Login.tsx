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

    try {
      const userData = await loginUser(email, password);
      console.log("Inloggad som: ", userData);
      //Navigate to new page
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data) {
        setError(axiosError.response.data.message);
      } else {
        setError("Fel användarnamn eller lösenord");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Logga in</h1>
      <form onSubmit={handleSubmit}>
        <div className="email-wrapper">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password-wrapper">
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Logga in
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="create-user-wrapper">
        <p>Har du inte ett konto?</p>
        <button onClick={() => handleNavigation("/signup")}>Skapa konto</button>
      </div>
    </div>
  );
};

export default Login;
