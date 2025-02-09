import { Link, useLoaderData } from "react-router-dom";
import propTypes from "prop-types";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ActionButtons from "../ActionButtons/ActionButtons";

function PostList() {
  const { posts } = useLoaderData();
  return (
    <PrivateRoute>
      {posts.length ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Post {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available</p>
      )}
    </PrivateRoute>
  );
}

export default PostList;

function Post({ id, title, content, isPublished }) {
  return (
    <article>
      <Link to={id.toString()}>
        <p>{title}</p>
        <p>State: {isPublished ? "published" : "unpublished"}</p>
        <p>
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
