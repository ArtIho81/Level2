const http = require("http");

const host = "localhost";
const port = 8000;

// const requestListener = function (req, res) {
//   res.writeHead(200);
//   res.end("My first server!");
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// });

var querystring = require("querystring");

const server = http.createServer().listen(port);

server.on("request", function (req, res) {
  if (req.method == "POST") {
    let body = "";
  }

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    let post = querystring.parse(body);
    console.log(post);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  });
});

console.log("Listening on port 3000");
