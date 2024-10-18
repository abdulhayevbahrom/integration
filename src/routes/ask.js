require("dotenv").config();
const router = require("express").Router();
const OpenAI = require("openai"); // o'zgartirish kiritamiz

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { fileId, question } = req.body;

  try {
    const response = await openai.createAnswer({
      file: fileId,
      question: question,
      model: "gpt-4",
      examples_context: "Your examples context here",
      examples: [["Example question", "Example answer"]],
      max_tokens: 200,
    });

    res.json({ success: true, answer: response.data.answers[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
