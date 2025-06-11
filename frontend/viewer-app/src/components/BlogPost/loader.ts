import { LoaderFunction } from "react-router-dom";
import { publicBlogAPI } from "@common/utils/blogAPI";

export const loader: LoaderFunction = async ({ params }) => {
  const res = await publicBlogAPI.getPublishedPostById(params.postId!);
  if (!res.ok) throw res;
  return res.json();
};
