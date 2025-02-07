import { useLoaderData } from "react-router-dom";
import ActionButtons from "../ActionButtons/ActionButtons";
import CommentSection from "./CommentSection";

function BlogPost() {
  const { post } = useLoaderData();

  return (
    <div>
      <article>
        <header>
          <h1>{post.title}</h1>
          <time itemProp="publishedDate" dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString("en-GB").split(",")[0]}
          </time>
          <ActionButtons id={post.id} isPublished={post.isPublished} />
        </header>
        <p>{post.content}</p>
      </article>
      <CommentSection comments={post.comments} />
    </div>
  );
}

export default BlogPost;
