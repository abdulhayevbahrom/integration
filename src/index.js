require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8080;

const ask = require("./routes/ask");
const search = require("./routes/search");
const analyze = require("./routes/analyze");

app.use(cors());
app.use(express.json());

app.use("/ask", ask);
app.use("/search", search);
app.use("/analyze", analyze);

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
  `);
});

app.get("/", (req, res) => res.status(200).json({ message: "hello!" }));

app.listen(PORT, () => console.log("http://localhost:" + PORT));
