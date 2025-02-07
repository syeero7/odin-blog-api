import { getPosts } from "../../utils/api";

export const postListLoader = async () => {
  const posts = await getPosts();
  return posts.json();
};
