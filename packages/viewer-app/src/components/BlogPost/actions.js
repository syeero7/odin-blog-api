import { redirect } from "react-router-dom";
import { createComment, updateComment, deleteComment } from "../../utils/api";

export const createCommentAction = async ({ request, params }) => {
  const { postId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await createComment(postId, body);
  return redirect(`/posts/${postId}#comments`);
};

export const updateCommentAction = async ({ request, params }) => {
  const { postId, commentId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await updateComment(commentId, body);
  return redirect(`/posts/${postId}#comments`);
};

export const deleteCommentAction = async ({ params }) => {
  const { postId, commentId } = params;
  await deleteComment(commentId);
  return redirect(`/posts/${postId}#comments`);
};
