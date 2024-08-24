import express from "express";
import fs from "fs/promises";
import path from "path";
import url from "url";

const PORT = process.env.PORT || 8000;

const app = express();

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathMiddleware = async (req, res, fileName, next) => {
  const filePath = path.join(__dirname, "public", fileName);
  const data = await fs.readFile(filePath);

  next(data);
};

// Homepage
app.get("/", async (req, res) => {
  filePathMiddleware(req, res, "index.html", (data) => {
    res.status(200).send(data);
  });
});

// About page
app.get("/about", async (req, res) => {
  filePathMiddleware(req, res, "about.html", (data) => {
    res.status(200).send(data);
  });
});

// Contact page
app.get("/contact", async (req, res) => {
  filePathMiddleware(req, res, "contact.html", (data) => {
    res.status(200).send(data);
  });
});

// 404 page
app.get("*", async (req, res) => {
  filePathMiddleware(req, res, "404.html", (data) => {
    res.status(404).send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Basic Info Site - Listening on PORT ${PORT}!`);
});
