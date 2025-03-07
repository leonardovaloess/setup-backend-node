// sessionController.js
import SessionService from "../services/SessionService.js";
import jwt from "jsonwebtoken";

class SessionController {
  async signUp(req, res) {
    const { user_name, user_email, user_password } = req.body;
    try {
      const newUser = await SessionService.signUp(
        user_name,
        user_email,
        user_password
      );
      const id = newUser.user_id;
      return res.status(200).json({
        newUser,
        token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { user_email, user_password } = req.body;
    try {
      const user = await SessionService.login(user_email, user_password);
      const id = user.user_id;
      return res.status(200).json({
        user,
        token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new SessionController();
