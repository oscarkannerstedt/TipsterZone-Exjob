import { useHandleNavigation } from "../utils/navigationUtils";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: IPrivateRouteProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleNavigation = useHandleNavigation();

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-message">
        <h1>Du måste vara inloggad för att se denna sida.</h1>
        <p>Logga in eller skapa ett konto för att fortsätta.</p>

        <div className="button-container">
          <button
            onClick={() => handleNavigation("/login")}
            className="login-button"
            aria-label="Logga in om du redan har ett konto"
          >
            Logga in här
          </button>
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
  }

  return <>{children}</>;
};

export default PrivateRoutes;
