import { useNavigate, Form, useFetcher } from "react-router-dom";
import propTypes from "prop-types";

function ActionButtons({ id, isPublished }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(`${id}/edit`)}>Edit</button>
      <TogglePostState state={isPublished} postId={id} />
      <Form action={`${id}/delete`} method="delete">
        <button type="submit">Delete</button>
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

export default ActionButtons;
