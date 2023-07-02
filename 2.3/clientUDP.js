const dgram = require("dgram");

const client = dgram.createSocket("udp4");
const serverPort = 3000;
const serverAddress = "localhost";

const requestData = "Some text to send";

const startTime = Date.now(); 

const message = Buffer.from(requestData);

client.send(message, serverPort, serverAddress, (error) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Message sent:", requestData);
  }
});

client.on("message", (message, remote) => {
  const responseData = message.toString();

  const endTime = Date.now(); 
  const elapsedTime = endTime - startTime; 

  console.log("Received data:", responseData);
  console.log("Is response same as request?", requestData === responseData);
  console.log("Elapsed time:", elapsedTime, "ms");

  client.close(); 
});
