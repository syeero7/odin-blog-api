import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <ul>
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
          <>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/posts/new">New Post</NavLink>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
