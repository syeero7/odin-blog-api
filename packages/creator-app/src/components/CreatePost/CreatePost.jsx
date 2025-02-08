import { useActionData } from "react-router-dom";
import PostForm from "../PostForm/PostForm";

function CreatePost() {
  const data = useActionData();

  return (
    <div>
      <h1>Create Post</h1>
      <PostForm method="POST" errors={data?.errors} />
    </div>
  );
}

export default CreatePost;
