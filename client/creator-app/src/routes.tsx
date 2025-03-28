import { createBrowserRouter } from "react-router-dom";
import Fallback from "@common/components/Fallback";
import ErrorPage from "@common/components/ErrorPage";
import LoginForm from "@common/components/LoginForm";
import SignUpForm from "@common/components/SignUpForm";
import * as actions from "@common/components/BlogPost/actions";

import PostList, { loader as postsLoader } from "./components/PostList";
import BlogPost, { loader as blogPostLoader } from "./components/BlogPost";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Homepage from "./components/Homepage";
import App from "./App";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    HydrateFallback: Fallback,
    children: [
      { index: true, Component: Homepage },
      { path: "login", Component: LoginForm },
      { path: "register", Component: SignUpForm },
      {
        path: "posts",
        loader: postsLoader,
        Component: PostList,
        HydrateFallback: Fallback,
      },
      { path: "posts/new", Component: CreatePost },
      { path: "posts/:postId/update", Component: EditPost, loader: blogPostLoader },
      {
        path: "posts/:postId",
        loader: blogPostLoader,
        Component: BlogPost,
        HydrateFallback: Fallback,
        children: [
          { path: "comments", action: actions.createComment },
          { path: "comments/:commentId/update", action: actions.updateComment },
          { path: "comments/:commentId/delete", action: actions.deleteComment },
        ],
      },
    ],
  },
]);
