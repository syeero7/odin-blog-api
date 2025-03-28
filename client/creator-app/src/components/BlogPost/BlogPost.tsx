import { PostWithComments } from "@common/utils/types";
import { useLoaderData } from "react-router-dom";
import Post from "@common/components/BlogPost";
import ActionButtons from "../ActionButtons";

function BlogPost() {
  const { post } = useLoaderData<{ post: PostWithComments }>();

  return (
    <Post post={post} isAdmin>
      {(id, isPublished) => <ActionButtons id={id} isPublished={isPublished} />}
    </Post>
  );
}

export default BlogPost;
