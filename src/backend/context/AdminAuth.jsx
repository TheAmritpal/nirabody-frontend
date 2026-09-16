import { createContext, useState, useEffect, useRef } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const initialAdminInfo = localStorage.getItem('adminInfo');
  const [user, setUser] = useState(initialAdminInfo ? JSON.parse(initialAdminInfo) : null);
  const timeoutRef = useRef(null);

  const SESSION_DURATION = 120 * 60 * 1000; // 1 hour

  const startSessionTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      logout();
    }, SESSION_DURATION);
  };

  const login = (userData) => {
    const adminData = {
      token: userData.token,
      id: userData.id,
      name: userData.name,
      loginTimestamp: Date.now(),
    };
    setUser(adminData);
    localStorage.setItem('adminInfo', JSON.stringify(adminData));
    startSessionTimeout();
  };

  const logout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    localStorage.removeItem('adminInfo');
    setUser(null);
  };

  const isAuthenticated = () => {
    if (!user || !user.loginTimestamp) return false;
    const timeElapsed = Date.now() - user.loginTimestamp;
    return timeElapsed < SESSION_DURATION && !!user.token;
  };

  useEffect(() => {
    if (user && user.loginTimestamp) {
      const timeElapsed = Date.now() - user.loginTimestamp;
      if (timeElapsed >= SESSION_DURATION) {
        logout();
      } else {
        timeoutRef.current = setTimeout(() => {
          logout();
        }, SESSION_DURATION - timeElapsed);
      }
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user]);

  return (
    <AdminAuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
};