const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",");

export const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);

    if (!origin && process.env.NODE_ENV === "development") {
      console.warn("Allowing request with no origin in development mode.");
      callback(null, true);
      return;
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
};
