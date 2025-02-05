import { handleRegister } from "../../utils/api";

export const signUpAction = async ({ request }) => {
  const formdata = await request.formData();
  const body = Object.fromEntries(formdata);
  const response = await handleRegister({
    ...body,
    isAuthor: body.isAuthor === "on",
  });
  return response.json();
};
