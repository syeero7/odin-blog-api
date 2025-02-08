import { redirect } from "react-router-dom";
import { updatePost } from "../../utils/api";

export const updatePostAction = async ({ request, params }) => {
  const { postId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const createdAt = new Date().toLocaleString().split(",")[0];

  const response = await updatePost(postId, { ...body, createdAt });
  if (response.ok) return redirect(`/posts/${postId}`);
  return response.json();
};
