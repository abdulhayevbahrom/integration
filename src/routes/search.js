const router = require("express").Router();
const { getJson } = require("serpapi");
const API_KEY = process.env.SerpAPI_API_KEY;

router.get("/", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query)
      return res.status(400).json({ error: "Введите поисковой запрос!" });

    const params = {
      q: query,
      location: "Belarus",
      engine: "google",
      api_key: API_KEY,
    };

    const result = await getJson("google", params);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Произошла ошибка, попробуйте позже!" });
  }
});

module.exports = router;
