import { createBrowserRouter, redirect } from "react-router-dom";
import Fallback from "@shared/components/Fallback";
import ErrorPage from "@shared/components/ErrorPage";
import LoginForm from "@shared/components/LoginForm";
import SignUpForm from "@shared/components/SignUpForm";
import * as actions from "@shared/components/BlogPost/actions";

import PostList, { loader as postsLoader } from "./components/PostList";
import BlogPost, { loader as blogPostLoader } from "./components/BlogPost";
import App from "./App";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: App,
    HydrateFallback: Fallback,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, loader: () => redirect("/posts") },
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
