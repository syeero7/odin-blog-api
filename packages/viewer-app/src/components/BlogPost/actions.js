import { redirect } from "react-router-dom";
import {
  createComment as _createComment,
  updateComment as _updateComment,
  deleteComment as _deleteComment,
} from "../../utils/api";

export const createComment = async ({ request, params }) => {
  const { postId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await _createComment(postId, body);
  return redirect(`/posts/${postId}#comments`);
};

export const updateComment = async ({ request, params }) => {
  const { postId, commentId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await _updateComment(commentId, body);
  return redirect(`/posts/${postId}#comments`);
};

export const deleteComment = async ({ params }) => {
  const { postId, commentId } = params;
  await _deleteComment(commentId);
  return redirect(`/posts/${postId}#comments`);
};
