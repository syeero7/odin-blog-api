import { createContext, useContext, useState } from "react";
import propTypes from "prop-types";

import { handleLogout } from "../../utils/api";
import { LOCAL_STORAGE_KEY, getItem } from "../../utils/localStorage";

const AuthContext = createContext({
  token: "",
  onLogout: () => {},
  isAuthor: false,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const getUser = () => getItem(LOCAL_STORAGE_KEY) || {};

function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser);

  const value = {
    token: user.token,
    isAuthor: user.author,
    onLogout: () => {
      setUser({});
      handleLogout();
    },
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
