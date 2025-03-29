import { createContext, ReactElement, use, useEffect, useState } from "react";
import { getItem, setItem, removeItem } from "../utils/localStorage";
import { AuthenticatedUser } from "../utils/types";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: AuthenticatedUser | null;
  onLogout: () => void;
  onLogin: (user: AuthenticatedUser) => void;
}

interface AuthProviderProps {
  children: ReactElement | ReactElement[];
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const user = use(AuthContext);
  if (user === undefined) {
    throw new Error("useAuth must be used within a descendant of AuthProvider");
  }
  return user;
};

const getUser = () => getItem();

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(getUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      removeItem();
      navigate("/");
      return;
    }
    setItem(user);
  }, [navigate, user]);

  const handleLogin = (user: AuthenticatedUser) => setUser(user);
  const handleLogout = () => setUser(null);

  const value = {
    user,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;
