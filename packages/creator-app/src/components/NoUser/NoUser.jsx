import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

function NoUser() {
  const navigate = useNavigate();
  const { token } = useAuth();

  if (token != null) return <Navigate to="/posts" replace />;

  return (
    <div>
      <h1>Access Restricted</h1>
      <p>Please log in to continue</p>

      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Sign Up</button>
    </div>
  );
}

export default NoUser;
