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

// authentication

export const handleLogin = async (body) => {
  return await handleFetch("auth/login", { method: "POST", body }, false);
};

export const handleRegister = async (body) => {
  return await handleFetch("auth/register", { method: "POST", body }, false);
};

// posts

export const getPosts = async () => {
  return await handleFetch("posts/published");
};

export const getPost = async (postId) => {
  return await handleFetch(`posts/published/${postId}/comments`);
};

export const createComment = async (postId, body) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`posts/${postId}/comments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
};

export const updateComment = async (commentId, body) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`posts/comments/${commentId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
};

export const deleteComment = async (commentId) => {
  const { token } = getItem(LOCAL_STORAGE_KEY);

  await handleFetch(`posts/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};
