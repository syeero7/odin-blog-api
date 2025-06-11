import { PostWithComments } from "@common/utils/types";
import { useLoaderData } from "react-router-dom";
import Post from "@common/components/BlogPost";

function BlogPost() {
  const { post } = useLoaderData<{ post: PostWithComments }>();

  return <Post post={post} />;
}

export default BlogPost;
