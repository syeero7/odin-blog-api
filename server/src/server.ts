import express from "express";
import cors from "cors";

import "./config/passport.js";
import routes from "./api/index.js";
import authenticate from "./middleware/authenticate.js";
import errorHandler from "./middleware/error-handler.js";

import { corsOptions } from "./config/cors.js";

const server = express();

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/auth", routes.auth);
server.use("/posts", authenticate, routes.posts);

server.use(errorHandler);

const PORT = process.env.PORT!;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
