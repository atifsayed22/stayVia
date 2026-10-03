import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (data) => {
    const user = await authService.login(data);
    setUser(user);
  };

  const signup = async (data) => {
    try {
      const user = await authService.signup(data);

      setUser(user);

      return user
    } catch (err) {
      const message =  err?.response?.data?.message
      setError(true) ;
      throw err ; 
     
    }
  };
  const logout = async () => {
    await authService.logout();

    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();

      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
