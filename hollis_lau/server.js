const http = require("http");
const fs = require("fs");
const path = require("path");

var server = module.exports = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Tower, this is Ghostrider, requesting a flyby.");
    return res.end();
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("Negative Ghostrider, the pattern is full.");
  return res.end();
});

server.listen(3000, () => process.stdout.write("Server up on port 3000\n"));
