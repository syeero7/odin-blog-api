import express, { type ErrorRequestHandler } from "express";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import cors from "cors";

import prisma from "@/prisma-client.js";
import auth from "./api/auth/router.js";
import posts from "./api/posts/router.js";

const server = express();
const { ALLOWED_ORIGINS, SECRET, NODE_ENV, PORT } = process.env;

server.use(
  cors({
    origin: (origin, cb) => {
      if (NODE_ENV === "development") {
        cb(null, true);
        return;
      }

      if (origin && ALLOWED_ORIGINS?.split(",").includes(origin)) {
        cb(null, true);
        return;
      }

      cb(new Error("Not allowed by CORS"));
    },
  })
);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return done(null, false, { message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      secretOrKey: SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async ({ id }, done) => {
      try {
        const user = await prisma.user.findUniqueOrThrow({ where: { id } });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

server.use("/auth", auth);
server.use("/posts", posts);

server.use(((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || "Server Error" });
}) as ErrorRequestHandler);

server.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
