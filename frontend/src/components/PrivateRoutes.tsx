interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoutes = ({ children }: IPrivateRouteProps) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <div className="not-logged-in-message">
        <h2>Du måste vara inloggad för att se denna sida.</h2>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoutes;
