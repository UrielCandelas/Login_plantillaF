import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

import { register, login, verifyToken,logout } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const confirmPassword = user.confirmPassword;
      const password = user.password;
      if (password != confirmPassword) {
        setErrors(["Las contraseñas deben de coincidir"])
        return;
      }
      const newUser = {
        name: user.username,
        email: user.email,
        password: user.password
      }
      const res = await register(newUser);
      setUser(res.data);
      setIsAuthenticated(true);
      
    } catch (error) {
      //console.error(error.response);
      setErrors(error.response.data);
    }
  };
  const signin = async (user) => {
    try {
      const res = await login(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
      
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  /*const logoutFunc = async()=>{
    try {
      await logout()
      setIsAuthenticated(false)
      setUser(null)
      setLoading(true)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  }*/

  useEffect(() => {
    if (errors.length > 0) {
      const timmer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timmer);
    }
  }, [errors]);

  useEffect(() => {
    async function checklogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyToken(cookies.token);
        if (!res.data) {
          setUser(null)
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checklogin();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        loading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
