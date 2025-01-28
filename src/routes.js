import { Router } from "express";
import sessionController from "./app/controllers/sessionController";
//a
const routes = new Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ ok: true });
});

routes.get("/ok", (req, res) => {
  return res.status(200).json({ ok2: true });
});

routes.post("/sign-up", sessionController.signUp);
routes.post("/login", sessionController.login);

export default routes;
