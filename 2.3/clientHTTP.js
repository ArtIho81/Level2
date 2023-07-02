const http = require("http");

const requestData = "Some text to send";

const startTime = Date.now();

const options = {
  hostname: "localhost", 
  port: 3000,
  method: "POST", 
  headers: {
    "Content-Type": "text/plain",
    "Content-Length": requestData.length,
  },
};

const req = http.request(options, (res) => {
  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    console.log("Received data:", responseData);
    console.log("Is response same as request?", requestData === responseData);
    console.log("Elapsed time:", elapsedTime, "ms");
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
});

req.write(requestData);
req.end();
