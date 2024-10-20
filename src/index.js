require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5050;

const search = require("./routes/search");
const analyze = require("./routes/analyze");

app.use(cors());
app.use(express.json());

app.use("/search", search);
app.use("/analyze", analyze);
app.get("/", (req, res) => res.status(200).json({ message: "Привет!" }));

app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Страница не найдена</h1>
    <p>Страница, которую вы ищете, не существует.</p>
  `);
});

app.listen(PORT, () => console.log("http://localhost:" + PORT));
