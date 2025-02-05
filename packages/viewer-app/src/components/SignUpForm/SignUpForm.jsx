import { Form, Link, Navigate, useActionData } from "react-router-dom";
import { useState } from "react";
import InputField from "../InputField/InputField";
import { useAuth } from "../AuthProvider/AuthProvider";

function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);
  const data = useActionData();
  const { token } = useAuth();

  if (token) return <Navigate to="/" replace />;
  if (data?.user) return <Navigate to="/login" replace />;

  const errors = data?.errors;

  return (
    <>
      <Form method="post">
        <h1>Create an account</h1>

        <InputField
          label="Email"
          type="email"
          name="email"
          errorMessage={errors?.email?.msg}
          autoComplete="username"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          errorMessage={errors?.password?.msg}
          autoComplete="new-password"
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          errorMessage={errors?.confirmPassword?.msg}
          autoComplete="new-password"
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
            errorMessage={errors?.authorPasscode?.msg}
          />
        )}
        <button type="submit">Sign up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </>
  );
}

export default SignUpForm;
