import { handleLogin } from "../../utils/api";

export const loginAction = async ({ request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const response = await handleLogin(body);
  return response.json();
};
