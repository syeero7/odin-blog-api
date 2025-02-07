import { getItem, LOCAL_STORAGE_KEY } from "./localStorage";

const DEFAULT_OPTIONS = { headers: { "Content-type": "application/json" } };
const handleFetch = async (url, options, throwResponse = true) => {
  if (options?.body) options.body = JSON.stringify(options.body);
  if (options?.headers) {
    options.headers = { ...DEFAULT_OPTIONS.headers, ...options.headers };
  }

  const response = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
  if (!response.ok && throwResponse) throw response;
  return response;
};

const getHeaders = () => {
  const { token } = getItem(LOCAL_STORAGE_KEY) || {};
  return { headers: { Authorization: `Bearer ${token}` } };
};

// authentication

export const handleLogin = async (body) => {
  return await handleFetch("/api/auth/login", { method: "POST", body }, false);
};

export const handleRegister = async (body) => {
  return await handleFetch(
    "/api/auth/register",
    { method: "POST", body },
    false
  );
};

// posts

export const getPosts = async () => {
  return await handleFetch("/api/posts", { ...getHeaders() });
};

export const getPost = async (postId) => {
  return await handleFetch(`/api/posts/${postId}/comments`, {
    ...getHeaders(),
  });
};

export const createPost = async (body) => {
  await handleFetch("/api/posts/", { method: "POST", ...getHeaders(), body });
};

export const updatePost = async (postId, body) => {
  await handleFetch(`/api/posts/${postId}/`, {
    method: "PUT",
    ...getHeaders(),
    body,
  });
};

export const updatePostStatus = async (postId, body) => {
  await handleFetch(`/api/posts/${postId}/status`, {
    method: "PUT",
    ...getHeaders(),
    body,
  });
};

export const deletePost = async (postId) => {
  await handleFetch(`/api/posts/${postId}`, {
    method: "DELETE",
    ...getHeaders(),
  });
};

export const createComment = async (postId, body) => {
  await handleFetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    ...getHeaders(),
    body,
  });
};

export const updateComment = async (commentId, body) => {
  await handleFetch(`/api/posts/comments/${commentId}`, {
    method: "PUT",
    ...getHeaders(),
    body,
  });
};

export const deleteComment = async (commentId) => {
  await handleFetch(`/api/posts/comments/${commentId}`, {
    method: "DELETE",
    ...getHeaders(),
  });
};
