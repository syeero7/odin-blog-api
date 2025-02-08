import { useActionData, useLoaderData } from "react-router-dom";
import PostForm from "../PostForm/PostForm";

function EditPost() {
  const { post } = useLoaderData();
  const data = useActionData();

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm method="PUT" values={{ ...post }} errors={data?.errors} />
    </div>
  );
}

export default EditPost;
