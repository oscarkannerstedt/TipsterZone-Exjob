import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Matches from "./pages/Matches";
import MyPredicitons from "./pages/MyPredictions";
import Login from "./pages/Login";
import SignupUser from "./pages/SignupUser";
import Rules from "./pages/Rules";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/mypredictions",
        element: <MyPredicitons />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupUser />,
      },
      {
        path: "/rules",
        element: <Rules />,
      },
    ],
  },
]);
