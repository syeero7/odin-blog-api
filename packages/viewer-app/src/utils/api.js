import { getItem, LOCAL_STORAGE_KEY } from "./localStorage";

const DEFAULT_OPTIONS = { headers: { "Content-type": "application/json" } };
const handleFetch = async (url, options) => {
  if (options?.body) options.body = JSON.stringify(options.body);
  if (options?.headers) {
    options.headers = { ...DEFAULT_OPTIONS.headers, ...options.headers };
  }

  const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
  if (!response.ok) throw response;
  return response;
};

// authentication

export const handleLogin = async (body) => {
  return await handleFetch("/api/auth/login", { method: "POST", body });
};

export const handleRegister = async (body) => {
  await handleFetch("/api/auth/register", { method: "POST", body });
};

// posts

export const getPosts = async () => {
  return await handleFetch("/api/posts/published");
};

export const getPost = async (postId) => {
  return await handleFetch(`/api/posts/published/${postId}/comments`);
};

export const createComment = async (postId, body) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
};

export const updateComment = async (commentId, body) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`/api/posts/comments/${commentId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
};

export const deleteComment = async (commentId) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`/api/posts/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
