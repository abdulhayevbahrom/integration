const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const upload = multer({ dest: path.join(__dirname, "uploads/") });

const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

router.post("/", upload.single("file"), async (req, res) => {
  try {
    let filePath = path.join(__dirname, "uploads", req.file.filename);
    const fileContent = await readFileAsync(filePath, "utf8");

    if (!isUTF8(fileContent)) {
      const utf8FilePath = path.join(
        __dirname,
        "uploads",
        "utf8_" + req.file.filename
      );
      await writeFileAsync(utf8FilePath, fileContent, "utf8");
      filePath = utf8FilePath;
    }

    const jsonlFilePath = path.join(__dirname, "uploads", "output.jsonl");
    const jsonLines = fileContent.split("\n").map((line) => {
      return JSON.stringify({ prompt: line, completion: "Javob" });
    });

    await writeFileAsync(jsonlFilePath, jsonLines.join("\n"), "utf8");

    const fileStream = fs.createReadStream(jsonlFilePath);

    const response = await openai.files.create({
      file: fileStream,
      purpose: "fine-tune",
    });

    res.json({ success: true, fileId: response.id });

    fs.unlink(filePath, (err) => {
      if (err) console.error("Faylni o'chirishda xatolik:", err);
    });
    fs.unlink(jsonlFilePath, (err) => {
      if (err) console.error("JSONL faylni o'chirishda xatolik:", err);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

function isUTF8(string) {
  const utf8Pattern = /^[\u0000-\u007F]*$/;
  return utf8Pattern.test(string);
}

module.exports = router;
