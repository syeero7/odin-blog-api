import { type LoaderFunction } from "react-router-dom";
import { publicBlogAPI } from "@shared/utils/blogAPI";

export const loader: LoaderFunction = async () => {
  const res = await publicBlogAPI.getPublishedPosts();
  if (!res.ok) throw res;
  return res.json();
};
