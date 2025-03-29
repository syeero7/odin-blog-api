import { Link, Navigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import { useState } from "react";

import { publicBlogAPI } from "../utils/blogAPI";
import { useAuth } from "./AuthProvider";
import UserForm from "./UserForm";
import Input from "./Input";

function LoginForm() {
  const { errors, formAction, shouldRedirect } = useFormController();

  if (shouldRedirect) return <Navigate to="/posts" replace />;

  return (
    <UserForm action={formAction}>
      <h1>Log in to your account</h1>

      <Input
        label="Email"
        name="email"
        type="email"
        error={errors?.email}
        autoComplete="username"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        error={errors?.password}
        autoComplete="current-password"
        required
      />
      <SubmitButton />
      <p>
        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </UserForm>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Login
    </button>
  );
}

interface LoginErrors {
  email: string;
  password: string;
}

const useFormController = () => {
  const [errors, setErrors] = useState<LoginErrors | null>(null);
  const { user, onLogin } = useAuth();
  const shouldRedirect = user !== null;

  const formAction = async (formData: FormData) => {
    const { email, password } = Object.fromEntries(
      [...formData].map(([key, val]) => [key, val.toString()])
    );
    const res = await publicBlogAPI.loginUser({ email, password });

    if (res.ok) {
      const { token, id } = await res.json();
      onLogin({ token, id });
      return;
    }

    const { errors } = await res.json();
    setErrors(errors);
  };

  return { errors, formAction, shouldRedirect } as const;
};

export default LoginForm;
