import { redirect, ActionFunction } from "react-router-dom";
import { publicBlogAPI } from "../../utils/blogAPI";

export const createComment: ActionFunction = async ({ request, params }) => {
  const { postId } = params;
  const formData = await request.formData();
  const body = { comment: formData.get("comment")! as string };

  await publicBlogAPI.createComment(postId!, body);
  return redirect(`/posts/${postId!}`);
};

export const updateComment: ActionFunction = async ({ request, params }) => {
  const { postId, commentId } = params;
  const formData = await request.formData();
  const body = { comment: formData.get("comment")! as string };

  await publicBlogAPI.updateComment(commentId!, body);
  return redirect(`/posts/${postId}`);
};

export const deleteComment: ActionFunction = async ({ params }) => {
  const { postId, commentId } = params;
  await publicBlogAPI.deleteComment(commentId!);
  return redirect(`/posts/${postId!}`);
};
