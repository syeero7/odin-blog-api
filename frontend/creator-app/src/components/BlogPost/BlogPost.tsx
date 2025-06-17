import { type PostWithComments } from "@shared/utils/types";
import { useLoaderData } from "react-router-dom";
import Post from "@shared/components/BlogPost";
import ActionButtons from "../ActionButtons";

function BlogPost() {
  const { post } = useLoaderData<{ post: PostWithComments }>();

  return (
    <Post post={post} admin>
      {(id, published) => <ActionButtons id={id} published={published} />}
    </Post>
  );
}

export default BlogPost;
