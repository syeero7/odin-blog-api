import { useLoaderData } from "react-router-dom";
import CommentSection from "./CommentSection";
import styles from "./BlogPost.module.css";

function BlogPost() {
  const { post } = useLoaderData();

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <h1>{post.title}</h1>
          <time itemProp="publishedDate" dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString("en-GB").split(",")[0]}
          </time>
        </header>
        <p>{post.content}</p>
        <CommentSection comments={post.comments} />
      </article>
    </div>
  );
}

export default BlogPost;
