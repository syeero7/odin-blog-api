import { Form } from "react-router-dom";
import propTypes from "prop-types";
import InputField from "../InputField/InputField";

function PostForm({ method, values = {}, errors = {} }) {
  return (
    <Form method={method}>
      <InputField
        type="text"
        label="Title"
        name="title"
        value={values.title}
        errorMessage={errors.title}
      />

      <div>
        <label>
          <span>Content</span>
          <textarea
            required
            maxLength="300"
            name="content"
            value={values.content || null}
          ></textarea>
        </label>
        {errors.content && <span>* {errors.content}</span>}
      </div>

      <InputField
        type="checkbox"
        label="Publish"
        name="isPublished"
        checked={values.isPublished && values.isPublished}
        required={false}
      />
      <button type="submit">{method === "PUT" ? "Update" : "Create"}</button>
    </Form>
  );
}

PostForm.propTypes = {
  method: propTypes.string.isRequired,
  values: propTypes.object,
  errors: propTypes.object,
};

export default PostForm;
