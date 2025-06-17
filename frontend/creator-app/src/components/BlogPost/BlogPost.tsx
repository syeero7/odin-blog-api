import { type PostWithComments } from "@shared/utils/types";
import { useLoaderData } from "react-router-dom";
import Post from "@shared/components/BlogPost";
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
