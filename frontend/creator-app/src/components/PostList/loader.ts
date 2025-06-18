import { type LoaderFunction } from "react-router-dom";
import { privateBlogAPI } from "@shared/utils/blogAPI";
import { getItem } from "@shared/utils/localStorage";

export const loader: LoaderFunction = async () => {
  if (!getItem()?.token) return;
  const res = await privateBlogAPI.getPosts();
  if (!res.ok) throw res;
  return res.json();
};
