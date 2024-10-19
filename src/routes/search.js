const router = require("express").Router();
const { SerpApiSearch } = require("serpapi"); // serpapi paketi

// SerpAPI API kalitingiz
const API_KEY = "YOUR_SERPAPI_KEY";

// /search route
router.get("/", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query)
      return res.status(400).json({ error: "Qidiruv so`rovini kiriting!" });

    const search = new SerpApiSearch(API_KEY);
    const params = { q: query, engine: "google" };
    const result = await search.json(params);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Xato yuz berdi, keyinroq qayta urinib ko‘ring!" });
  }
});

module.exports = router;
