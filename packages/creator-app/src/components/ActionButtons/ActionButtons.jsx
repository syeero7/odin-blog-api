import { useNavigate, Form, useFetcher } from "react-router-dom";
import propTypes from "prop-types";
import styles from "./ActionButtons.module.css";

function ActionButtons({ id, isPublished }) {
  const navigate = useNavigate();
  const postURL = `/posts/${id}/`;

  return (
    <div className={styles.container}>
      <button
        className={styles.edit}
        onClick={() => navigate(`${postURL}update`)}
      >
        Edit
      </button>
      <TogglePostState state={isPublished} postId={id} />
      <Form
        action={`${postURL}delete`}
        method="delete"
        onSubmit={(e) => {
          if (!confirm("Are you sure you want to delete this post?")) {
            e.preventDefault();
          }
        }}
      >
        <button style={styles.delete} type="submit">
          Delete
        </button>
      </Form>
    </div>
  );
}

ActionButtons.propTypes = {
  id: propTypes.number.isRequired,
  isPublished: propTypes.bool.isRequired,
};

function TogglePostState({ state, postId }) {
  const fetcher = useFetcher();
  const isPublished = fetcher.formData
    ? fetcher.formData.get("isPublished") === "true"
    : state;

  return (
    <fetcher.Form method="put">
      <input type="hidden" name="postId" value={postId} />
      <button
        className={styles.state}
        type="submit"
        name="isPublished"
        value={isPublished ? "false" : "true"}
        aria-label={isPublished ? "unpublish the post" : "publish the post"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </button>
    </fetcher.Form>
  );
}

TogglePostState.propTypes = {
  state: propTypes.bool.isRequired,
  postId: propTypes.number.isRequired,
};

export default ActionButtons;
