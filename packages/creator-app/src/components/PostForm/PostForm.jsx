import { Form, useLocation, useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import InputField from "../InputField/InputField";
import styles from "./PostForm.module.css";

function PostForm({ method, values = {}, errors = {} }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const path = location.pathname.slice(1).split("/");

    switch (path[path.length - 1]) {
      case "update":
        return navigate(`/posts/${path[1]}`);
      case "new":
        return navigate("/posts");
      default:
        return navigate("/");
    }
  };

  return (
    <Form method={method} className={styles.form}>
      <InputField
        type="text"
        label="Title"
        name="title"
        value={values.title}
        errorMessage={errors.title?.msg}
      />

      <div>
        <label className={styles.label}>
          <span>Content</span>
          <textarea
            required
            maxLength="1000"
            name="content"
            defaultValue={values.content || null}
          ></textarea>
        </label>
        {errors.content && (
          <span aria-live="polite" className={styles.error}>
            * {errors.content?.msg}
          </span>
        )}
      </div>

      {method === "POST" && (
        <InputField
          type="checkbox"
          label="Publish"
          name="isPublished"
          required={false}
        />
      )}
      <div className={styles.container}>
        <button type="submit">{method === "PUT" ? "Update" : "Create"}</button>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
      </div>
    </Form>
  );
}

PostForm.propTypes = {
  method: propTypes.string.isRequired,
  values: propTypes.object,
  errors: propTypes.object,
};

export default PostForm;
