import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./NoUser.module.css";

function NoUser() {
  const navigate = useNavigate();
  const { token } = useAuth();

  if (token != null) return <Navigate to="/posts" replace />;

  return (
    <div className={styles.container}>
      <div>
        <h1>Access Restricted</h1>
        <p>Please log in to continue</p>

        <div className={styles.buttons}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default NoUser;
