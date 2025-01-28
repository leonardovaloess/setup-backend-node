import express from "express";
import routes from "./routes.js";

//import './database/index.js';

class app {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new app().server;
