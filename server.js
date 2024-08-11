import fs from "fs/promises";
import http from "http";
import path from "path";
import url from "url";

const PORT = process.env.PORT;

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      let filePath;

      if (req.url === "/") {
        res.statusCode = 200;
        filePath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        res.statusCode = 200;
        filePath = path.join(__dirname, "public", "about.html");
      } else if (req.url === "/contact") {
        res.statusCode = 200;
        filePath = path.join(__dirname, "public", "contact.html");
      } else {
        res.statusCode = 404;
        filePath = path.join(__dirname, "public", "404.html");
      }

      const data = await fs.readFile(filePath);

      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.write("Server Error");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});