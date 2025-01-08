import { useNavigate } from "react-router-dom";

export const useHandleNavigation = () => {
  const navigate = useNavigate();

  return (path: string) => {
    navigate(path);
  };
};
