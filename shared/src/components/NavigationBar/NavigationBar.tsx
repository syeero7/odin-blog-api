import { NavLink, type NavLinkProps } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { type ReactElement, useEffect, useRef, useState } from "react";
import styles from "./NavigationBar.module.css";
import logo from "../../assets/logo.webp";

interface NavBarProps {
  children: { private?: ReactElement; public?: ReactElement };
}

function NavigationBar({ children }: NavBarProps) {
  const { user, onLogout } = useAuth();
  const { isOpen, onClick, onBlur, menuRef } = useMenuController();

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={logo} alt="" width="40" height="40" />
            <span>Lorem</span>
          </NavLink>
        </div>

        <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
          onClick={onClick}
          onBlur={onBlur}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
        </button>

        <ul
          className={`${styles.container} ${isOpen ? styles.open : ""}`}
          ref={menuRef}
        >
          {children.public}
          {!user ? (
            <AuthNavLinks />
          ) : (
            <>
              {children.private}
              <li>
                <button
                  type="button"
                  onClick={onLogout}
                  className={styles.button}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

NavigationBar.Link = function ({ children, ...props }: NavLinkProps) {
  return (
    <li>
      <NavLink {...props} viewTransition>
        {children}
      </NavLink>
    </li>
  );
};

function AuthNavLinks() {
  return (
    <>
      <NavigationBar.Link to="/login">Login</NavigationBar.Link>
      <NavigationBar.Link to="/register">Signup</NavigationBar.Link>
    </>
  );
}

const useMenuController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocusOut, setIsFocusOut] = useState(false);
  const menuRef = useRef<null | HTMLUListElement>(null);

  const onClick = () => {
    setIsOpen((prev) => !prev);
    menuRef.current?.querySelector("a")?.focus();
  };

  const onBlur = () => setIsFocusOut(true);

  useEffect(() => {
    if (isFocusOut) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setIsFocusOut(false);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [isFocusOut]);

  return { onClick, onBlur, isOpen, menuRef } as const;
};

export default NavigationBar;
