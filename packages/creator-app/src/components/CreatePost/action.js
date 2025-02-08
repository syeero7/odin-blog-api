import { redirect } from "react-router-dom";
import { createPost } from "../../utils/api";

export const createPostAction = async ({ request }) => {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const isPublished = body.isPublished === "on";
  const createdAt = new Date().toLocaleString().split(",")[0];

  const response = await createPost({ ...body, isPublished, createdAt });
  if (response.ok) return redirect("/posts");
  return response.json();
};
