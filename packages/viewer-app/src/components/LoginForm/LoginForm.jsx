import { Form, Link, Navigate, useActionData } from "react-router-dom";
import InputField from "../InputField/InputField";
import { useAuth } from "../AuthProvider/AuthProvider";

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
    <>
      <Form method="post">
        <h1>Log in to your account</h1>

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
        <button type="submit">Login</button>

        <p>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
