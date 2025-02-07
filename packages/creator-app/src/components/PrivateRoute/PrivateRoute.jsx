import { Navigate } from "react-router-dom";
import propTypes from "prop-types";
import { getItem, LOCAL_STORAGE_KEY } from "../../utils/localStorage";

export default function PrivateRoute({ children }) {
  const user = getItem(LOCAL_STORAGE_KEY);

  if (!user?.token) return <Navigate to="/" replace />;

  return children;
}

PrivateRoute.propTypes = {
  children: propTypes.element.isRequired,
};
