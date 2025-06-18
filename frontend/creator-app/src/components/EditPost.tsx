import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { privateBlogAPI } from "@shared/utils/blogAPI";
import PostForm from "./PostForm";
import { type Post } from "@shared/utils/types";

function EditPost() {
  const { post } = useLoaderData<{ post: Post }>();
  const [errors, setErrors] = useState(undefined);
  const navigate = useNavigate();
  const postId = post.id;

  const formAction = async (formData: FormData) => {
    const published = formData.get("published") === "on";
    const body = {
      published,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    const res = await privateBlogAPI.updatePost(postId, body);
    if (res.ok) return navigate(`/posts/${postId}`);
    const { errors } = await res.json();
    setErrors(errors);
  };

  return (
    <PostForm
      title="Update"
      values={post}
      action={formAction}
      errors={errors}
    />
  );
}

export default EditPost;
