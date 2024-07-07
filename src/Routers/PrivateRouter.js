import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PrivateRouter = ({ children }) => {
  const { account, isAuthenticated } = useSelector((state) => ({
    account: state.user.account,
    isAuthenticated: state.user.isAuthenticated,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRouter;
