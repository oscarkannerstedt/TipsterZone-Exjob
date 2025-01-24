import { useNavigate } from "react-router-dom";

export const useHandleNavigation = () => {
  const navigate = useNavigate();

  return (path: string, state?: object) => {
    navigate(path, state);
    window.scrollTo(0, 0);
  };
};
