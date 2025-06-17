import { type ReactElement } from "react";
import { type PostWithComments } from "../../utils/types";
import CommentSection from "./CommentSection";
import styles from "./BlogPost.module.css";

interface BlogPostProps {
  post: PostWithComments;
  children?: (id: number, isPublished: boolean) => ReactElement;
  isAdmin?: boolean;
}

function BlogPost({ children, post, isAdmin = false }: BlogPostProps) {
  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <header className={styles.header}>
          <h1>{post.title}</h1>

          <time itemProp="publishedDate" dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleString("en-GB").split(",")[0]}
          </time>

          {children && children(post.id, post.isPublished)}
        </header>
        <p>{post.content}</p>

        <CommentSection comments={post.comments} isAdmin={isAdmin} />
      </article>
    </main>
  );
}

export default BlogPost;
