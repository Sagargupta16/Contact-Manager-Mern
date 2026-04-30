const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const contacts = require("./routes/api/contacts");

dotenv.config();

const app = express();

// Disable X-Powered-By header to avoid framework fingerprinting (S5689)
app.disable("x-powered-by");

// Connect Database
connectDB();

// Restrict CORS to known frontends (S5122).
// CORS_ALLOWED_ORIGINS is a comma-separated list; defaults cover local dev
// and the GitHub Pages deployment at sagargupta.online.
const allowedOrigins = new Set(
  (
    process.env.CORS_ALLOWED_ORIGINS ||
    "http://localhost:3000,https://sagargupta16.github.io,https://sagargupta.online"
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, server-to-server) that have no Origin header.
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/contacts", contacts);

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Server running on port ${port}`));
