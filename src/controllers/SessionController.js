import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class SessionController {
  /*
  
  => Fazer a validação dos dados com Yup
  => Fazer o CRUD Cliente e Contrato
  
  */

  async signUp(req, res) {
    const { user_name, user_email, user_password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        user_email: user_email,
      },
    });
    if (user) {
      return res.status(400).json({ error: "usuário ja existe" });
    } else {
      const hashPassword = await bcrypt.hash(user_password, 8);
      const newUser = await prisma.user.create({
        data: {
          user_name: user_name,
          user_email: user_email,
          user_password: hashPassword,
        },
      });

      const id = newUser.user_id;

      return res.status(200).json({
        newUser,
        token: jwt.sign({ id }, process.env.SECRET, {
          expiresIn: "7d",
        }),
      });
    }
  }
  async login(req, res) {
    const { user_email, user_password } = req.body;

    const user = await prisma.user.findFirst({
      where: { user_email: user_email },
    });
    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado!" });
    }

    const isPasswordVaild = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (isPasswordVaild) {
      const id = user.user_id;
      return res.status(200).json({
        user,
        token: jwt.sign({ id }, process.env.SECRET, {
          expiresIn: "7d",
        }),
      });
    } else {
      return res.status(400).json({ error: "falha login" });
    }
  }
}

export default new SessionController();
