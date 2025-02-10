import { getItem, LOCAL_STORAGE_KEY } from "./localStorage";

const apiURL = import.meta.env.VITE_API_URL;
const DEFAULT_OPTIONS = { headers: { "Content-type": "application/json" } };

const handleFetch = async (path, options, throwResponse = true) => {
  if (options?.body) options.body = JSON.stringify(options.body);
  if (options?.headers) {
    options.headers = { ...DEFAULT_OPTIONS.headers, ...options.headers };
  }

  const url = `${apiURL}/${path}`;
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
  return await handleFetch("auth/login", { method: "POST", body }, false);
};

export const handleRegister = async (body) => {
  return await handleFetch("auth/register", { method: "POST", body }, false);
};

// posts

export const getPosts = async () => {
  return await handleFetch("posts", { ...getHeaders() });
};

export const getPost = async (postId) => {
  return await handleFetch(`posts/${postId}/comments`, {
    ...getHeaders(),
  });
};

export const createPost = async (body) => {
  return await handleFetch(
    "posts/",
    { method: "POST", ...getHeaders(), body },
    false
  );
};

export const updatePost = async (postId, body) => {
  return await handleFetch(
    `posts/${postId}/`,
    { method: "PUT", ...getHeaders(), body },
    false
  );
};

export const updatePostStatus = async (postId, body) => {
  await handleFetch(`posts/${postId}/status`, {
    method: "PUT",
    ...getHeaders(),
    body,
  });
};

export const deletePost = async (postId) => {
  await handleFetch(`posts/${postId}`, {
    method: "DELETE",
    ...getHeaders(),
  });
};

// comments

export const createComment = async (postId, body) => {
  await handleFetch(`posts/${postId}/comments`, {
    method: "POST",
    ...getHeaders(),
    body,
  });
};

export const updateComment = async (commentId, body) => {
  await handleFetch(`posts/comments/${commentId}`, {
    method: "PUT",
    ...getHeaders(),
    body,
  });
};

export const deleteComment = async (commentId) => {
  await handleFetch(`posts/comments/${commentId}`, {
    method: "DELETE",
    ...getHeaders(),
  });
};
