import { useActionData } from "react-router-dom";
import PostForm from "../PostForm/PostForm";
import styles from "./CreatePost.module.css";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function CreatePost() {
  const data = useActionData();

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <div>
          <h1>Create Post</h1>
          <PostForm method="POST" errors={data?.errors} />
        </div>
      </div>
    </PrivateRoute>
  );
}

export default CreatePost;
