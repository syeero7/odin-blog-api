import { Form, useFetcher, useNavigate } from "react-router-dom";
import styles from "./ActionButtons.module.css";

function ActionButtons({ id, published }: { id: number; published: boolean }) {
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
      <TogglePostState state={published} postId={id} />
      <Form
        action={`${postURL}delete`}
        method="delete"
        onSubmit={(e) => {
          if (!confirm("Are you sure you want to delete this post?")) {
            e.preventDefault();
          }
        }}
      >
        <button className={styles.delete} type="submit">
          Delete
        </button>
      </Form>
    </div>
  );
}

function TogglePostState({
  state,
  postId,
}: {
  state: boolean;
  postId: number;
}) {
  const fetcher = useFetcher();
  const published = fetcher.formData
    ? fetcher.formData.get("published") === "true"
    : state;

  return (
    <fetcher.Form method="put">
      <input type="hidden" name="postId" value={postId} />
      <button
        className={styles.state}
        type="submit"
        name="published"
        value={published ? "false" : "true"}
        aria-label={published ? "unpublish the post" : "publish the post"}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </fetcher.Form>
  );
}

export default ActionButtons;
