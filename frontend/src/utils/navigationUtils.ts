import { useNavigate } from "react-router-dom";

export const useHandleNavigation = () => {
  const navigate = useNavigate();

  return (path?: string, state?: object) => {
    if (path) {
      navigate(path, state);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
    window.scrollTo(0, 0);
  };
};
