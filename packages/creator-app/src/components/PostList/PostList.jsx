import { Link, useLoaderData } from "react-router-dom";
import propTypes from "prop-types";
import ActionButtons from "../ActionButtons/ActionButtons";
import styles from "./PostList.module.css";

function PostList() {
  const { posts } = useLoaderData();
  return (
    <>
      {posts.length ? (
        <ul className={styles.container}>
          {posts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noPost}>No posts available</p>
      )}
    </>
  );
}

export default PostList;

function Post({ id, title, content, isPublished }) {
  return (
    <article className={styles.card}>
      <Link to={id.toString()} className={styles.link}>
        <p className={styles.title}>{title}</p>
        <p className={styles.state}>
          State: {isPublished ? "published" : "unpublished"}
        </p>
        <p className={styles.content}>
          {content.length > 120 ? content.substring(0, 120) + "..." : content}
        </p>
      </Link>

      <ActionButtons id={id} isPublished={isPublished} />
    </article>
  );
}

Post.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  isPublished: propTypes.bool.isRequired,
};
