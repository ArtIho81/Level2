const dgram = require("dgram");

const server = dgram.createSocket("udp4");
const serverPort = 3000;

server.on("listening", () => {
  const address = server.address();
  console.log("Server listening on", address.address + ":" + address.port);
});

server.on("message", (message, remote) => {
  const requestData = message.toString();

  const currentTime = new Date().toLocaleString();

  console.log("Client IP:", remote.address);
  console.log("Request received:", requestData);
  console.log("Time:", currentTime);

  const responseMessage = Buffer.from(requestData);
  server.send(
    responseMessage,
    0,
    responseMessage.length,
    remote.port,
    remote.address,
    (error) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Response sent:", requestData);
      }
    }
  );
});

server.on("close", () => {
  console.log("Server closed");
});

server.bind(serverPort);
