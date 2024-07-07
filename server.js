import http from "http";
const PORT = 8000;
import url from "url";
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename, __dirname);

const server = http.createServer((req, res) => {
  //   res.write("Hello World");
  //   res.setHeader("Content-Type", "text/html");
  //   res.statusCode = 404;
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Homepage loaded successfully!</h1>");
      } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About loaded successfully!</h1>");
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
      }
    } else {
      throw new Error("Method not allowed");
    }
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server Error" }));
  }
  console.log(req.url);
  console.log(req.method);

  //   res.end("<h1>Hello Children</h1>");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
