const http = require("http");

const server = http.createServer((req, res) => {
  const startTime = Date.now();

  let requestData = "";

  req.on("data", (chunk) => {
    requestData += chunk;
  });

  req.on("end", () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime

    console.log("Client IP:", req.socket.remoteAddress);
    console.log("Request received:", requestData);
    console.log("Processing time:", elapsedTime, "ms");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(requestData);
  });
});

server.on("connection", (socket) => {
  console.log("Client connected:", socket.remoteAddress);
});

server.on("close", () => {
  console.log("Server closed");
});

const port = 3000;
server.listen(port, () => {
  console.log("Server listening on port", port);
});
