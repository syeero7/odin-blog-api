import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import { type Post as PostData } from "../../utils/types";
import styles from "./Post.module.css";
import noImg from "../../assets/no-image.webp";

interface PostProps extends PostData {
  children?: (id: number, published: boolean) => ReactElement;
}

function Post({ id, title, content, published, children }: PostProps) {
  return (
    <article className={styles.card}>
      <Link to={`/posts/${id}`} className={styles.link}>
        <img src={noImg} alt="" width="380" height="200" />

        <p className={styles.title}>
          <strong>{title}</strong>
        </p>
        <p className={styles.content}>
          {content.length > 120 ? content.substring(0, 120) + "..." : content}
        </p>
      </Link>
      {children && published !== undefined && children(id, published)}
    </article>
  );
}

export default Post;
