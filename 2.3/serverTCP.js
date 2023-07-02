const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress);

  socket.on("data", (data) => {
    const requestData = data.toString();

    console.log("Received data:", requestData);

    socket.write(requestData);
  });

  socket.on("end", () => {
    console.log("Client disconnected:", socket.remoteAddress);
  });

  socket.on("error", (error) => {
    console.error("Error:", error);
  });
});

server.on("close", () => {
  console.log("Server closed");
});

const port = 3000;
server.listen(port, () => {
  console.log("Server listening on port", port);
});
