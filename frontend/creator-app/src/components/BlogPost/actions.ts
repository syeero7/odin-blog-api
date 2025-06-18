import { privateBlogAPI } from "@shared/utils/blogAPI";
import { type ActionFunction, redirect } from "react-router-dom";

export const updatePostStatus: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const published = formData.get("published") === "true";
  const postId = formData.get("postId") as string;
  const res = await privateBlogAPI.updatePostStatus(postId, { published });
  if (!res.ok) throw res;
};

export const deletePost: ActionFunction = async ({ params }) => {
  await privateBlogAPI.deletePost(params.postId!);
  return redirect("/posts");
};
