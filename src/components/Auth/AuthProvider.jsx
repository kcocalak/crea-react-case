import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  const navigate = useNavigate();

  const login = async (username, password) => {
    if (username === "user" && password === "user123") {
      const token = "mock-jwt-token";
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setUser(username);
      setIsAuthenticated(true);
      navigate("/products");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
