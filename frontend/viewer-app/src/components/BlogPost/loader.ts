import { type LoaderFunction } from "react-router-dom";
import { publicBlogAPI } from "@shared/utils/blogAPI";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await publicBlogAPI.getPublishedPostById(params.postId!);
  if (!res.ok) throw res;
  return res.json();
};
