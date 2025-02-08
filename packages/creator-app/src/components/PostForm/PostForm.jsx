import { Form } from "react-router-dom";
import propTypes from "prop-types";
import InputField from "../InputField/InputField";

function PostForm({ method, values = {}, actionData = {} }) {
  const errors = Object.fromEntries(
    actionData.errors?.map((err) => [err.path, err.msg]) || []
  );

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
            defaultValue={values.content || null}
          ></textarea>
        </label>
        {errors.content && <span aria-live="polite">* {errors.content}</span>}
      </div>

      {method === "POST" && (
        <InputField
          type="checkbox"
          label="Publish"
          name="isPublished"
          required={false}
        />
      )}

      <button type="submit">{method === "PUT" ? "Update" : "Create"}</button>
    </Form>
  );
}

PostForm.propTypes = {
  method: propTypes.string.isRequired,
  values: propTypes.object,
  actionData: propTypes.object,
};

export default PostForm;
