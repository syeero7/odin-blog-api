import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

import {
  LOCAL_STORAGE_KEY,
  getItem,
  setItem,
  removeItem,
} from "../../utils/localStorage";

const AuthContext = createContext({
  token: "",
  userid: null,
  onLogout: () => {},
  onLogin: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const getUser = () => getItem(LOCAL_STORAGE_KEY) || {};

function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser);

  const handleLogin = (user) => {
    setItem(LOCAL_STORAGE_KEY, user);
    setUser(getUser());
  };

  const handleLogout = () => {
    setUser({});
    removeItem(LOCAL_STORAGE_KEY);
  };

  const value = {
    token: user.token,
    userid: user.id,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.element),
    propTypes.element,
  ]).isRequired,
};

export default AuthProvider;
