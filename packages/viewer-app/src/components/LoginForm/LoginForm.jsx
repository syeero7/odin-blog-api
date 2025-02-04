import { Form, Link, Navigate } from "react-router-dom";
import propTypes from "prop-types";
import InputField from "../InputField/InputField";
import { useAuth } from "../AuthProvider/AuthProvider";

function LoginForm({ children }) {
  const { token } = useAuth();

  if (token) return <Navigate to="/" replace />;

  return (
    <>
      <Form method="post">
        <h1>Log in to your account</h1>

        <InputField label="Email" name="email" type="email" />
        <InputField label="Password" name="password" type="password" />
        <button type="submit">Login</button>

        <p>
          Don&apos;t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </Form>
      {children}
    </>
  );
}

LoginForm.propTypes = {
  children: propTypes.element,
};

export default LoginForm;
