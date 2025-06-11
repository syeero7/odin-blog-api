import { createBrowserRouter } from "react-router-dom";
import Fallback from "@common/components/Fallback";
import ErrorPage from "@common/components/ErrorPage";
import LoginForm from "@common/components/LoginForm";
import SignUpForm from "@common/components/SignUpForm";
import * as actions from "@common/components/BlogPost/actions";

import PostList, { loader as postsLoader } from "./components/PostList";
import BlogPost, { loader as blogPostLoader } from "./components/BlogPost";
import Homepage from "./components/Homepage";
import App from "./App";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Fallback,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, Component: Homepage, ErrorBoundary: ErrorPage },
      { path: "register", Component: SignUpForm },
      { path: "login", Component: LoginForm },
      {
        path: "posts",
        loader: postsLoader,
        Component: PostList,
        HydrateFallback: Fallback,
      },
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
