import { privateBlogAPI } from "@common/utils/blogAPI";
import { ActionFunction, redirect } from "react-router-dom";

export const updatePostStatus: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const isPublished = formData.get("isPublished") === "true";
  const postId = formData.get("postId") as string;
  const res = await privateBlogAPI.updatePostStatus(postId, { isPublished });
  if (!res.ok) throw res;
};

export const deletePost: ActionFunction = async ({ params }) => {
  await privateBlogAPI.deletePost(params.postId!);
  return redirect("/posts");
};
