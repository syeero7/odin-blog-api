import { Link, useLoaderData } from "react-router-dom";
import propTypes from "prop-types";
import styles from "./PostList.module.css";

export default function PostList() {
  const { posts } = useLoaderData();
  return posts.length ? (
    <ul className={styles.container}>
      {posts.map((post) => (
        <li key={post.id} className={styles.card}>
          <Post {...post} />
        </li>
      ))}
    </ul>
  ) : (
    <p className={styles.noPosts}>No posts available</p>
  );
}

function Post({ id, title, content }) {
  return (
    <Link to={`posts/${id}`} className={styles.link}>
      <article>
        <p className={styles.title}>{title}</p>
        <p className={styles.content}>
          {content.length > 120 ? content.substring(0, 120) + "..." : content}
        </p>
      </article>
    </Link>
  );
}

Post.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
};
