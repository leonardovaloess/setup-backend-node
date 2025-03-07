import { Router } from "express";
import sessionController from "./controllers/SessionController.js";
//a
const routes = new Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ ok: true });
});

routes.post("/sign-up", sessionController.signUp);
routes.post("/login", sessionController.login);

export default routes;
