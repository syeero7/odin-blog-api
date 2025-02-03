import { redirect } from "react-router-dom";
import { handleRegister } from "../../utils/api";

export const signUpAction = async ({ request }) => {
  const formdata = await request.formData();
  const body = Object.fromEntries(formdata);
  await handleRegister({ ...body, isAuthor: body.isAuthor === "on" });
  return redirect("/login");
};
