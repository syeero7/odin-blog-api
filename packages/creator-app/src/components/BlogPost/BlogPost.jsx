import { useLoaderData } from "react-router-dom";
import ActionButtons from "../ActionButtons/ActionButtons";
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
          <ActionButtons id={post.id} isPublished={post.isPublished} />
        </header>
        <p>{post.content}</p>
        <CommentSection comments={post.comments} />
      </article>
    </div>
  );
}

export default BlogPost;
