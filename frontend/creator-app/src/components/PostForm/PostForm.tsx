import { useLocation, useNavigate } from "react-router-dom";
import { useFormStatus } from "react-dom";
import { FormHTMLAttributes } from "react";
import Input from "@common/components/Input";
import styles from "./PostForm.module.css";
import { Post } from "@common/utils/types";

interface PostFormProps extends Pick<FormHTMLAttributes<HTMLFormElement>, "action"> {
  title: "Update" | "Create";
  values?: Post;
  errors?: { title: { msg: string }; content: { msg: string } };
}

function PostForm({ title, action, values, errors }: PostFormProps) {
  return (
    <main className={styles.container}>
      <div>
        <h1>{title} post</h1>

        <form action={action} className={styles.form}>
          <Input
            type="text"
            label="Title"
            name="title"
            required
            defaultValue={values?.title}
            error={errors?.title?.msg}
          />

          <ContentTextarea value={values?.content} error={errors?.content?.msg} />

          {title === "Create" && (
            <Input type="checkbox" label="Publish" name="isPublished" required={false} />
          )}

          <FormButtons title={title} />
        </form>
      </div>
    </main>
  );
}

function ContentTextarea({ value, error }: { value?: string; error?: string }) {
  return (
    <div>
      <label className={styles.label}>
        <span>Content</span>
        <textarea
          required
          maxLength={1000}
          name="content"
          defaultValue={value}></textarea>
      </label>

      {error && (
        <span aria-live="polite" className={styles.error}>
          * {error}
        </span>
      )}
    </div>
  );
}

function FormButtons({ title }: { title: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pending } = useFormStatus();

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
    <div className={styles.buttons}>
      <button type="submit" disabled={pending}>
        {title}
      </button>
      <button type="button" onClick={handleClick} disabled={pending}>
        Cancel
      </button>
    </div>
  );
}

export default PostForm;
