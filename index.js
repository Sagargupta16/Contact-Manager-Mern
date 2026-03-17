const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const contacts = require("./routes/api/contacts");

dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/contacts", contacts);

// Serve static files in production
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Server running on port ${port}`));
