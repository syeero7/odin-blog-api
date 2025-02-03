import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Blog</NavLink>
        </li>
        {!token ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          </>
        ) : (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
