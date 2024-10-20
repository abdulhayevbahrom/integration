// const app = require("express").Router();
// const multer = require("multer");
// const axios = require("axios");
// const fs = require("fs");

// const YOUR_API_KEY = process.env.OPENAI_API_KEY;

// const upload = multer({ dest: "uploads/" });

// app.post("/", upload.single("file"), async (req, res) => {
//   const { question } = req.body;
//   const filePath = req.file.path;

//   const fileContent = fs.readFileSync(filePath, "utf-8");

//   try {
//     const chatGPTResponse = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are analyzing a file." },
//           {
//             role: "user",
//             content: `Here is the file content: ${fileContent}. Question: ${question}`,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${YOUR_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const gptAnswer = chatGPTResponse.data.choices[0].message.content;
//     res.json({ response: gptAnswer });
//   } catch (error) {
//     console.log(error.response.data);

//     res.status(500).json({ error: "Error analyzing the file with ChatGPT" });
//   }
// });

// module.exports = app;
// -----------
// const app = require("express").Router();
// const multer = require("multer");
// const axios = require("axios");
// const fs = require("fs");

// const YOUR_API_KEY = process.env.OPENAI_API_KEY;

// const upload = multer({ dest: "uploads/" });
// const path = require("path");
// const mammoth = require("mammoth");
// const pdf = require("pdf-parse");
// const xlsx = require("xlsx"); // Excel fayllarini o'qish uchun kutubxona

// app.post("/", upload.single("file"), async (req, res) => {
//   const { question } = req.body;
//   const filePath = req.file.path;
//   const fileExt = path.extname(req.file.originalname).toLowerCase();

//   try {
//     let fileContent;

//     // Fayl turini tekshirib, tahlil qilish
//     if (fileExt === ".txt") {
//       fileContent = fs.readFileSync(filePath, "utf-8");
//     } else if (fileExt === ".pdf") {
//       const dataBuffer = fs.readFileSync(filePath);
//       const pdfData = await pdf(dataBuffer);
//       fileContent = pdfData.text;
//     } else if (fileExt === ".docx") {
//       const dataBuffer = fs.readFileSync(filePath);
//       const wordData = await mammoth.extractRawText({ buffer: dataBuffer });
//       fileContent = wordData.value;
//     } else if (fileExt === ".xlsx") {
//       // Excel faylini o'qish
//       const workbook = xlsx.readFile(filePath);
//       const sheetName = workbook.SheetNames[0]; // Birinchi varaqqa e'tibor qaratamiz
//       const worksheet = workbook.Sheets[sheetName];
//       fileContent = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // Excelni JSON ga aylantirish
//     } else {
//       return res
//         .status(400)
//         .json({ error: "Fayl turi qo‘llab-quvvatlanmaydi." });
//     }

//     // Fayl kontenti va savolni ChatGPT ga yuborish
//     const chatGPTResponse = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [
//           { role: "system", content: "You are analyzing a file." },
//           {
//             role: "user",
//             content: `Here is the file content: ${fileContent}. Question: ${question}`,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${YOUR_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const gptAnswer = chatGPTResponse.data.choices[0].message.content;
//     res.json({ response: gptAnswer });
//   } catch (error) {
//     res.status(500).json({ error: "Faylni tahlil qilishda xatolik yuz berdi" });
//   }
// });

// module.exports = app;

const app = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const YOUR_API_KEY = process.env.OPENAI_API_KEY;

const upload = multer({ dest: "uploads/" });
const path = require("path");
const mammoth = require("mammoth");
const pdf = require("pdf-parse");
const xlsx = require("xlsx");

app.post("/", upload.single("file"), async (req, res) => {
  const { question } = req.body; // Savol
  const filePath = req.file.path; // Fayl manzili
  const fileExt = path.extname(req.file.originalname).toLowerCase(); // Fayl kengaytmasi

  try {
    let fileContent;

    // Fayl turini tekshirib, tahlil qilish
    if (fileExt === ".txt") {
      fileContent = fs.readFileSync(filePath, "utf-8");
    } else if (fileExt === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      fileContent = pdfData.text;
    } else if (fileExt === ".docx") {
      const dataBuffer = fs.readFileSync(filePath);
      const wordData = await mammoth.extractRawText({ buffer: dataBuffer });
      fileContent = wordData.value;
    } else if (fileExt === ".xlsx") {
      // Excel faylini o'qish
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Birinchi varaqqa e'tibor qaratamiz
      const worksheet = workbook.Sheets[sheetName];
      fileContent = xlsx.utils.sheet_to_json(worksheet, { header: 1 }); // Excelni JSON ga aylantirish
    } else {
      return res
        .status(400)
        .json({ error: "Fayl turi qo‘llab-quvvatlanmaydi." });
    }

    // Fayldagi ma'lumotlarni qatorlarga ajratish
    const lines = Array.isArray(fileContent)
      ? fileContent
      : fileContent.split(/\r?\n/); // Excel yoki matn fayli qatorlarida ishlaydi

    // ChatGPT ga fayl kontenti va savolni yuborish
    const chatGPTResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are analyzing a file." },
          {
            role: "user",
            content: `Here are the file lines: ${JSON.stringify(
              lines
            )}. Question: ${question}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${YOUR_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gptAnswer = chatGPTResponse.data.choices[0].message.content;
    res.json({ response: gptAnswer });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Faylni tahlil qilishda xatolik yuz berdi." });
  }
});

module.exports = app;
