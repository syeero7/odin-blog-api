import { LoaderFunction } from "react-router-dom";
import { privateBlogAPI } from "@common/utils/blogAPI";

export const loader: LoaderFunction = async () => {
  const res = await privateBlogAPI.getPosts();
  if (!res.ok) throw res;
  return res.json();
};
