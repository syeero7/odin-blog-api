export const LOCAL_STORAGE_KEY = "blogger";

export const getItem = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    console.error(error);
  }
};

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
