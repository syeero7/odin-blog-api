import { redirect } from "react-router-dom";
import { handleLogin } from "../../utils/api";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await handleLogin(body);
  return redirect("/");
};
