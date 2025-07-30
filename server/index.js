require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    console.log("Using key:", process.env.OPENAI_KEY?.slice(0, 10));
    const response = await axios.post(
      `${process.env.OPENAI_API_BASE}/chat/completions`,
      {
        model: "mistralai/mixtral-8x7b-instruct", // FREE
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
