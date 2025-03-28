import { Navigate, useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";
import { useAuth } from "@common/components/AuthProvider";

function Homepage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user !== null) return <Navigate to="/posts" replace />;

  return (
    <main className={styles.container}>
      <div>
        <h1>Access Restricted</h1>
        <p>Please log in to continue</p>

        <div className={styles.buttons}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
