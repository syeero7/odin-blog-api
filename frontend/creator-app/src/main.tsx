import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { browserRouter } from "./routes";
import "@shared/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={browserRouter} />
  </StrictMode>
);
