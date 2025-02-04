import { Form, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import propTypes from "prop-types";
import InputField from "../InputField/InputField";
import { useAuth } from "../AuthProvider/AuthProvider";

function SignUpForm({ children }) {
  const [isChecked, setIsChecked] = useState(false);
  const { token } = useAuth();

  if (token) return <Navigate to="/" replace />;

  return (
    <>
      <Form method="post">
        <h1>Create an account</h1>

        <InputField label="Email" type="email" name="email" />
        <InputField label="Password" type="password" name="password" />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
        />
        <InputField
          label="Register as an author"
          type="checkbox"
          name="isAuthor"
          required={false}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        {isChecked && (
          <InputField
            label="Author Passcode"
            type="password"
            name="authorPasscode"
          />
        )}
        <button type="submit">Sign up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>

      {children}
    </>
  );
}

SignUpForm.propTypes = {
  children: propTypes.element,
};

export default SignUpForm;
