import { Form, Link, Navigate, useActionData } from "react-router-dom";
import InputField from "../InputField/InputField";
import { useAuth } from "../AuthProvider/AuthProvider";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const { token, onLogin } = useAuth();
  const data = useActionData();

  if (token) return <Navigate to="/" replace />;
  if (data?.token) {
    setTimeout(() => onLogin(data), 0);
    return <Navigate to="/" replace />;
  }

  const errors = data?.errors;

  return (
    <div className={styles.container}>
      <Form method="post" className={styles.form}>
        <h1 className={styles.center}>Log in to your account</h1>

        <InputField
          label="Email"
          name="email"
          type="email"
          errorMessage={errors?.email}
          autoComplete="username"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          errorMessage={errors?.password}
          autoComplete="current-password"
        />
        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.center}>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginForm;
