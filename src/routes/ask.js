// require("dotenv").config();
// const router = require("express").Router();
// const OpenAI = require("openai"); // o'zgartirish kiritamiz

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// router.post("/", async (req, res) => {
//   const { fileId, question } = req.body;
//   try {
//     const response = await openai.createAnswer({
//       file: fileId,
//       question: question,
//       model: "gpt-4",
//       examples_context: "Your examples context here",
//       examples: [["Example question", "Example answer"]],
//       max_tokens: 200,
//     });

//     res.json({ success: true, answer: response.data.answers[0] });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;

require("dotenv").config();
const router = require("express").Router();
const { OpenAI } = require("openai"); // OpenAI ni to'g'ri import qilish

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// router.post("/", async (req, res) => {
//   const { fileId, question } = req.body;

//   try {
//     // OpenAI ga savol yuborish
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o",
//       messages: [
//         {
//           role: "system",
//           content: "Siz faylga asoslangan savollarga javob berasiz.",
//         },
//         { role: "user", content: question },
//       ],
//       // Agar kerak bo'lsa, faylga mos ravishda qo'shimcha kontekst berishingiz mumkin
//       // examples_context: "Your examples context here",
//       // examples: [["Example question", "Example answer"]],
//       max_tokens: 200,
//     });

//     // Javobni qaytarish
//     res.json({ success: true, answer: response.choices[0].message.content });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

router.post("/", async (req, res) => {
  const { fileId, question } = req.body;

  try {
    // OpenAI ga savol yuborish
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Siz faylga asoslangan savollarga javob berasiz. Fayl ID: " +
            fileId,
        },
        { role: "user", content: question },
      ],
      max_tokens: 200,
    });

    // Javobni qaytarish
    res.json({ success: true, answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
