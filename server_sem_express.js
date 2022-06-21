const http = require("http");

// Create a local server to receive data from
const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });

  if ((request.url = "/produto")) {
    response.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  }

  if (request.url == "/usuario") {
    response.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  }
});

server.listen(5001, () => {
  console.log("servidor executando na porta 5001");
});
