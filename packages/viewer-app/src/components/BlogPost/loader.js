import { getPost } from "../../utils/api";

export const postLoader = async ({ params }) => {
  const postId = Number(params.postId);
  const post = await getPost(postId);
  return post.json();
};
