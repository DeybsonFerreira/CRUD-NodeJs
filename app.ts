import { HttpStatusCode } from "./models/httpStatusCode";
import { UserModel } from "./models/user";

const express = require("express");
const fs = require("fs");

const app = express();
/*****variables */
var userPath = `data/user.json`;

app.use(express.json());

var allUsers: UserModel[] = [];

fs.readFile(userPath, "utf-8", (error: any, data: any) => {
  if (error) {
    console.log("Error:", error);
    allUsers = [];
  } else {
    allUsers = JSON.parse(data);
  }
});

app.post("/user", (request: any, response: any) => {
  const userBody = request.body as UserModel;

  if (!userBody.id) {
    response.status(HttpStatusCode.BadRequest);
    return response.json("informe um {id}");
  }

  let exist = allUsers.find((i) => i.id == userBody.id);
  if (exist) {
    response.status(HttpStatusCode.BadRequest);
    return response.json("usuário com este {id} já existe");
  }

  allUsers.push(userBody);
  CreateUserFile(allUsers);
});

app.get("/user", (_request: any, response: any) => {
  return response.json(allUsers);
});

app.get("/user/:id", (request: any, response: any) => {
  let httpParam = request.params;

  let exist = allUsers.find((i) => i.id == httpParam.id);

  if (exist) {
    return response.json(exist);
  } else {
    response.status(HttpStatusCode.NotFound);
    return response.json("usuário não encontrado");
  }
});

app.put("/user/:id", (request: any, response: any) => {
  const httpParam = request.params;
  const userBody = request.body as UserModel;

  const userIndex = allUsers.findIndex((i) => i.id == httpParam.id);

  if (userIndex >= 0) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      name: userBody.name,
      lastName: userBody.lastName,
    };

    CreateUserFile(allUsers);
    return response.json("Usuário alterado com sucesso");
  } else {
    response.status(HttpStatusCode.NotFound);
    return response.json("usuário não encontrado");
  }
});

app.delete("/user/:id", (request: any, response: any) => {
  const httpParam = request.params;

  const userIndex = allUsers.findIndex((i) => i.id == httpParam.id);

  if (userIndex >= 0) {
    allUsers.splice(userIndex, 1);
    CreateUserFile(allUsers);
    return response.json("Usuário deletado com sucesso");
  } else {
    response.status(HttpStatusCode.NotFound);
    return response.json("usuário não encontrado");
  }
});

//adicionar no arquivo json
function CreateUserFile(allUsers: UserModel[]) {
  if (allUsers) {
    let jsonFile = JSON.stringify(allUsers);
    fs.writeFile(userPath, jsonFile, (error: any) => {
      if (error) {
        console.log("Error:", error);
      }
    });
  }
}

app.listen(8001, () => {
  console.log("Servidor executando na porta 8001");
});
