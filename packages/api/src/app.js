import express from "express";
import cors from "cors";

import "./config/passport.js";
import routes from "./routes/index.js";
import middleware from "./middleware/index.js";
import { corsOptions } from "./config/cors.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", routes.auth);
app.use("/posts", middleware.authenticate, routes.post);

app.use(middleware.errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
