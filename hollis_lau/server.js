const http = require("http");
const fs = require("fs");

module.exports = function (port, dir) {
  return http.createServer((req, res) => {
    var fileName;
    var jsonFile;

    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Tower, this is Ghostrider, requesting a flyby.");
      return res.end();
    }

    if (req.method === "GET" && req.url === "/notes") {
      fs.readdir(dir, (err, files) => {
        if (err) return process.stderr.write(err + "\n");

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(files.join("\n"));
        res.end();
      });
      return;
    }

    if (req.method === "POST" && req.url === "/notes") {
      fs.readdir(dir, (err, files) => {
        if (err) return process.stderr.write(err + "\n");
        fileName = String(files.length + 1) + ".json";
        jsonFile = fs.createWriteStream(dir + "/" + fileName);
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
  }).listen(port, () => process.stdout.write("Server up on port " + port + "\n"));
};
