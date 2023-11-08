const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const contacts = require("./routes/api/contacts");

const app = express();
const path = require("path");

dotenv.config();

// Connect Database
connectDB();

app.use(cors({ origin: true, Credentials: true }));
app.use(express.json());
app.use("/api/contacts", contacts);

__dirname = path.resolve();

const port = process.env.PORT || 3006;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
