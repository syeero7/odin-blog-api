import { createRoutesFromElements, Route } from "react-router-dom";

import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import PostList from "./components/PostList/PostList";
import { postListLoader } from "./components/PostList/loader";

import BlogPost from "./components/BlogPost/BlogPost";
import { postLoader } from "./components/BlogPost/loader";
import * as actions from "./components/BlogPost/actions";

import SignUpForm from "./components/SignUpForm/SignUpForm";
import { signUpAction } from "./components/SignUpForm/action";

import LoginForm from "./components/LoginForm/LoginForm";
import { loginAction } from "./components/LoginForm/action";

const routes = createRoutesFromElements(
  <Route
    path="/"
    element={<App />}
    hydrateFallbackElement={<>Loading...</>}
    errorElement={<ErrorPage />}
  >
    <Route path="register" element={<SignUpForm />} action={signUpAction} />
    <Route path="login" element={<LoginForm />} action={loginAction} />

    <Route index element={<PostList />} loader={postListLoader} />
    <Route path="posts/:postId" element={<BlogPost />} loader={postLoader}>
      <Route path="comments" action={actions.createComment}>
        <Route path=":commentId">
          <Route path="update" action={actions.updateComment} />
          <Route path="delete" action={actions.deleteComment} />
        </Route>
      </Route>
    </Route>
  </Route>
);

export default routes;
