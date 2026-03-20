import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import axiosInstance, { setupInterceptors } from "../api/axiosInstance";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessTokenRef = useRef(accessToken);
  accessTokenRef.current = accessToken;

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      }
      // Refresh failed — log user out
      setAuthUser(null);
      setAccessToken(null);
      return null;
    } catch {
      setAuthUser(null);
      setAccessToken(null);
      return null;
    }
  }, []);

  const clearAuth = useCallback(() => {
    setAuthUser(null);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    setupInterceptors(
      () => accessTokenRef.current,
      refreshAccessToken,
      clearAuth
    );
  }, [refreshAccessToken, clearAuth]);

  useEffect(() => {
    let isMounted = true;
    const verifyToken = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        if (isMounted) {
          setAuthUser(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setAuthUser(null);
          setAccessToken(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    verifyToken();
    return () => { isMounted = false; };
  }, [clearAuth]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        setAccessToken,
        refreshAccessToken,
        isLoading,
      }}
    >
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
