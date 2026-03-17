import { createContext, useContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      localStorage.removeItem("chat-user");
      return null;
    } catch {
      setAuthUser(null);
      setAccessToken(null);
      localStorage.removeItem("chat-user");
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const bootstrapToken = async () => {
      // If we have a user in localStorage, we must get a token before rendering
      if (authUser && !accessToken) {
        await refreshAccessToken();
      }
      if (isMounted) setIsLoading(false);
    };
    
    bootstrapToken();
    
    return () => { isMounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        setAccessToken,
        refreshAccessToken,
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
