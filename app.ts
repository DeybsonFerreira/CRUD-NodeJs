const userController = require("./controllers/userController");
const express = require("express");
const bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.json());

app.use("/user", userController);

app.listen(8001, () => {
  console.log("Servidor executando na porta 8001");
});
