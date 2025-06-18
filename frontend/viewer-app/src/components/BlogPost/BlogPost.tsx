import { type PostWithComments } from "@shared/utils/types";
import { useLoaderData } from "react-router-dom";
import Post from "@shared/components/BlogPost";

function BlogPost() {
  const { post } = useLoaderData<{ post: PostWithComments }>();

  return <Post post={post} />;
}

export default BlogPost;
