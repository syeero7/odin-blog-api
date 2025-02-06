import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./Navbar.module.css";

function Navbar() {
  const { token, onLogout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.container}>
        <li className={styles.listItem}>
          <NavLink className={styles.link} to="/">
            Blog
          </NavLink>
        </li>
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
          <li className={styles.listItem}>
            <button className={styles.button} onClick={onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
