import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

class SessionService {
  async signUp(user_name, user_email, user_password) {
    const user = await prisma.user.findFirst({
      where: { user_email: user_email },
    });
    if (user) {
      throw new Error("usuário ja existe");
    }

    const hashPassword = await bcrypt.hash(user_password, 8);
    const newUser = await prisma.user.create({
      data: {
        user_name: user_name,
        user_email: user_email,
        user_password: hashPassword,
      },
    });

    return newUser;
  }

  async login(user_email, user_password) {
    const user = await prisma.user.findFirst({
      where: { user_email: user_email },
    });
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!isPasswordValid) {
      throw new Error("Falha no login");
    }

    return user;
  }
}

export default new SessionService();
