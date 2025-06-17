import { type AuthenticatedUser } from "./types";

const LOCAL_STORAGE_KEY = "blogger";

export const getItem = (): AuthenticatedUser | null => {
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setItem = (value: AuthenticatedUser) => {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = () => {
  try {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error(error);
  }
};
