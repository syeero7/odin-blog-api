import {
  Link,
  useLoaderData,
  Form,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import propTypes from "prop-types";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
  const navigate = useNavigate();

  return (
    <article>
      <Link to={`posts/${id}`}>
        <p>{title}</p>
        <p>State: {isPublished ? "published" : "unpublished"}</p>
        <p>
          {content.length > 60 ? content.substring(0, 60) + "..." : content}
        </p>
      </Link>

      <div>
        <button onClick={() => navigate(`${id}/edit`)}>Edit</button>
        <TogglePostState state={isPublished} postId={id} />
        <Form action={`${id}/delete`} method="delete">
          <button type="submit">Delete</button>
        </Form>
      </div>
    </article>
  );
}

Post.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string.isRequired,
  isPublished: propTypes.bool.isRequired,
};

function TogglePostState({ state, postId }) {
  const fetcher = useFetcher();
  const isPublished = fetcher.formData
    ? fetcher.formData.get("isPublished") === "true"
    : state;

  return (
    <fetcher.Form method="put" action={`${postId}/update-state`}>
      <button
        type="submit"
        name="isPublished"
        value={isPublished ? "true" : "false"}
        aria-label={isPublished ? "unpublish the post" : "publish the post"}
      >
        {isPublished ? "unpublish" : "publish"}
      </button>
    </fetcher.Form>
  );
}

TogglePostState.propTypes = {
  state: propTypes.bool.isRequired,
  postId: propTypes.number.isRequired,
};
