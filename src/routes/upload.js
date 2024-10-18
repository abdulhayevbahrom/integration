const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai"); // o'zgartirish kiritamiz

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// Multer fayl yuklash uchun sozlamalar
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", req.file.path);
    const fileStream = fs.createReadStream(filePath);

    // OpenAI ga faylni yuklash
    const response = await openai.createFile(fileStream, "fine-tune");

    res.json({ success: true, fileId: response.data.id });
    fs.unlinkSync(filePath); // Faylni o'chirish
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
