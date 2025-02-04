import { Link, useLoaderData } from "react-router-dom";
import propTypes from "prop-types";

export default function PostList() {
  const { posts } = useLoaderData();
  return posts.length ? (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Post {...post} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No posts available</p>
  );
}

function Post({ id, title, content }) {
  return (
    <Link to={`posts/${id}`}>
      <article>
        <p>{title}</p>
        <p>
          {content.length > 60 ? content.substring(0, 60) + "..." : content}
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
