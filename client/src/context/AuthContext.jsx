import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUserProfile } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "manager" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      const { token } = response.data;

      localStorage.setItem("token", token);

      const userProfile = await getUserProfile();
      setUser(userProfile.data);
      setIsAuthenticated(true);

      if (userProfile.data.role === "manager") {
        navigate("/dashboard");
      } else if (userProfile.data.role === "viewer") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = await getUserProfile();
          setUser(userProfile.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Failed to fetch user profile:", error.message);
          handleLogout();
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
