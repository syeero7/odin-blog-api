import { Link, useNavigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import { useState } from "react";

import { publicBlogAPI } from "../utils/blogAPI";
import { useAuth } from "./AuthProvider";
import UserForm from "./UserForm";
import Input from "./Input";

function SignUpForm() {
  const [isChecked, setIsChecked] = useState(false);
  const { errors, formAction } = useFormController();

  return (
    <UserForm action={formAction}>
      <h1>Create an account</h1>

      <Input
        label="Email"
        type="email"
        name="email"
        error={errors?.email}
        autoComplete="username email"
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        error={errors?.password}
        autoComplete="new-password"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        error={errors?.confirmPassword}
        autoComplete="new-password"
        required
      />
      <Input
        label="Register as an author"
        type="checkbox"
        name="author"
        required={false}
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <Input
        disabled={!isChecked}
        label="Author Passcode"
        type="password"
        name="authorPasscode"
        error={errors?.authorPasscode}
        autoComplete="passcode"
        required
      />

      <SubmitButton />

      <p>
        Already have an account?{" "}
        <Link to="/login" viewTransition>
          Login
        </Link>
      </p>
    </UserForm>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Sign up
    </button>
  );
}

interface SignUpErrors {
  email: string;
  password: string;
  confirmPassword: string;
  authorPasscode: string;
}

const useFormController = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState<SignUpErrors | null>(null);
  const navigate = useNavigate();

  if (user) navigate("/posts", { replace: true });

  const formAction = async (formData: FormData) => {
    const { email, password, confirmPassword } = Object.fromEntries(
      [...formData].map(([key, val]) => [key, val.toString()])
    );
    const role = formData.get("author") === "on" ? "AUTHOR" : "USER";
    const authorPasscode = role
      ? (formData.get("authorPasscode") as string)
      : "";
    const body = { email, password, confirmPassword, role, authorPasscode };

    const res = await publicBlogAPI.registerUser(body);
    if (res.ok)
      return navigate("/login", { replace: true, viewTransition: true });

    const { errors } = await res.json();
    setErrors(errors);
  };

  return { errors, formAction } as const;
};

export default SignUpForm;
