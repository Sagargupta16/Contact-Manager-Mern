const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

const contacts = require("./routes/api/contacts");

dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contacts);

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Server running on port ${port}`));
