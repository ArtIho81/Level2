const net = require("net");

const requestData = "Some text to send"; 

const startTime = Date.now(); 

const client = net.createConnection({ port: 3000 }, () => {
  console.log("Connected to server");
  client.write(requestData); 
});

client.on("data", (responseData) => {
  const endTime = Date.now(); 
  const elapsedTime = endTime - startTime; 

  console.log("Received data:", responseData.toString());
  console.log(
    "Is response same as request?",
    requestData === responseData.toString()
  );
  console.log("Elapsed time:", elapsedTime, "ms");

  client.end();
});

client.on("end", () => {
  console.log("Disconnected from server");
});

client.on("error", (error) => {
  console.error("Error:", error);
});
