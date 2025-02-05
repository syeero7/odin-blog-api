import { useLoaderData } from "react-router-dom";
import CommentSection from "./CommentSection";

function BlogPost() {
  const { post } = useLoaderData();

  return (
    <article>
      <header>
        <h1>{post.title}</h1>
        <time itemProp="publishedDate" dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleString("en-GB").split(",")[0]}
        </time>
      </header>
      <p>{post.content}</p>

      <CommentSection comments={post.comments} />
    </article>
  );
}

export default BlogPost;
