import { createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import NoUser from "./components/NoUser/NoUser";
import ErrorPage from "./components/ErrorPage/ErrorPage";

// Authentication Components
import LoginForm from "./components/LoginForm/LoginForm";
import { loginAction } from "./components/LoginForm/action";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import { signUpAction } from "./components/SignUpForm/action";

// Post Components
import PostList from "./components/PostList/PostList";
import { postListLoader } from "./components/PostList/loader";
import BlogPost from "./components/BlogPost/BlogPost";
import { postLoader } from "./components/BlogPost/loader";
import * as postActions from "./components/BlogPost/actions";

// Post Management Components
import EditPost from "./components/EditPost/EditPost";
import { updatePostAction } from "./components/EditPost/action";
import CreatePost from "./components/CreatePost/CreatePost";
import { createPostAction } from "./components/CreatePost/action";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
    errorElement={<ErrorPage />}
    hydrateFallbackElement={<>Loading</>}
  >
    {/* Home Route */}
    <Route index element={<NoUser />} />

    {/* Authentication Routes */}
    <Route path="register" element={<SignUpForm />} action={signUpAction} />
    <Route path="login" element={<LoginForm />} action={loginAction} />

    {/* Post Listing Route */}
    <Route
      path="posts"
      element={<PostList />}
      loader={postListLoader}
      action={postActions.updatePostStatus}
    />

    {/* Create New Post Route */}
    <Route
      path="posts/new"
      element={<CreatePost />}
      action={createPostAction}
    />

    {/* Individual Post Routes */}
    <Route path="posts/:postId">
      {/* View Post */}
      <Route
        index
        element={<BlogPost />}
        loader={postLoader}
        action={postActions.updatePostStatus}
      />

      {/* Edit Post */}
      <Route
        path="update"
        element={<EditPost />}
        loader={postLoader}
        action={updatePostAction}
      />

      {/* Delete Post */}
      <Route path="delete" action={postActions.deletePost} />

      {/* Comment Management Routes */}
      <Route path="comments" action={postActions.createComment}>
        <Route path=":commentId">
          <Route path="update" action={postActions.updateComment} />
          <Route path="delete" action={postActions.deleteComment} />
        </Route>
      </Route>
    </Route>
  </Route>
);

export default routes;
