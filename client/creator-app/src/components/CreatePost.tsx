import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { privateBlogAPI } from "@common/utils/blogAPI";
import PostForm from "./PostForm";

function CreatePost() {
  const [errors, setErrors] = useState(undefined);
  const navigate = useNavigate();

  const formAction = async (formData: FormData) => {
    const isPublished = formData.get("isPublished") === "on";
    const createdAt = new Date().toLocaleString().split(",")[0];
    const body = {
      isPublished,
      createdAt,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    const res = await privateBlogAPI.createPost(body);
    if (res.ok) return navigate("/posts");
    const { errors } = await res.json();
    setErrors(errors);
  };

  return <PostForm title="Create" action={formAction} errors={errors} />;
}

export default CreatePost;
