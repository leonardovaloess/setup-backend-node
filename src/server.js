import app from "./app.js";

const server = app.listen(3333);

if (server) {
  console.log("Servidor rodando na porta 3333");
}
