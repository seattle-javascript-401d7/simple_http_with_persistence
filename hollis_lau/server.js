const http = require("http");
const fs = require("fs");

var server = module.exports = http.createServer((req, res) => {
  var fileName;
  var jsonFile;

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Tower, this is Ghostrider, requesting a flyby.");
    return res.end();
  }

  if (req.method === "GET" && req.url === "/notes") {
    fs.readdir(__dirname + "/data", (err, files) => {
      if (err) return process.stderr.write(err + "\n");

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(files.join("\n"));
      res.end();
    });
    return;
  }

  if (req.method === "POST" && req.url === "/notes") {
    fs.readdir(__dirname + "/data", (err, files) => {
      if (err) return process.stderr.write(err + "\n");
      fileName = String(files.length + 1) + ".json";
      jsonFile = fs.createWriteStream(__dirname + "/data/" + fileName);
      req.pipe(jsonFile);
    });

    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(fileName);
      res.end();
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("Negative Ghostrider, the pattern is full.");
  return res.end();
});

server.listen(3000, () => process.stdout.write("Server up on port 3000\n"));
