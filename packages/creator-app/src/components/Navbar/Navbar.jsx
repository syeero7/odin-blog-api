import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./Navbar.module.css";

function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.container}>
        {!token ? (
          <>
            <li className={styles.listItem}>
              <NavLink className={styles.link} to="/login">
                Login
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink className={styles.link} to="/register">
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className={styles.listItem}>
              <NavLink className={styles.link} to="/posts">
                Posts
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink className={styles.link} to="/posts/new">
                New Post
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <button className={styles.button} onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
