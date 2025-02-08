import { redirect } from "react-router-dom";
import {
  deletePost as _deletePost,
  updatePostStatus as _updatePostStatus,
  createComment as _createComment,
  updateComment as _updateComment,
  deleteComment as _deleteComment,
} from "../../utils/api";

export const updatePostStatus = async ({ request }) => {
  const formData = await request.formData();
  const { isPublished, postId } = Object.fromEntries(formData);
  await _updatePostStatus(postId, { isPublished });
};

export const deletePost = async ({ params }) => {
  await _deletePost(params.postId);
  return redirect("/posts");
};

export const createComment = async ({ request, params }) => {
  const { postId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await _createComment(postId, body);
  return redirect(`/posts/${postId}`);
};

export const updateComment = async ({ request, params }) => {
  const { postId, commentId } = params;
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  await _updateComment(commentId, body);
  return redirect(`/posts/${postId}`);
};

export const deleteComment = async ({ params }) => {
  const { postId, commentId } = params;
  await _deleteComment(commentId);
  return redirect(`/posts/${postId}`);
};
