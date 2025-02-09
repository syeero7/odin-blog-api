import { useActionData, useLoaderData } from "react-router-dom";
import PostForm from "../PostForm/PostForm";
import styles from "./EditPost.module.css";

function EditPost() {
  const { post } = useLoaderData();
  const data = useActionData();

  return (
    <div className={styles.container}>
      <div>
        <h1>Edit Post</h1>
        <PostForm method="PUT" values={{ ...post }} errors={data?.errors} />
      </div>
    </div>
  );
}

export default EditPost;
