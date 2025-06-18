import { type LoaderFunction } from "react-router-dom";
import { privateBlogAPI } from "@shared/utils/blogAPI";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await privateBlogAPI.getPostById(params.postId!);
  if (!res.ok) throw res;
  return res.json();
};
