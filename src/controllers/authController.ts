import { Request, Response } from "express";
import { authService } from "../services/authService";

export const authController = {
  signup: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await authService.signup(email, password);
      res.json({ message: "ユーザー登録完了", user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await authService.login(username, password);

      // セッションに保存
      (req.session as any).user = user;
      res.json({ message: "ログイン成功", user });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  },

  logout: (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ message: "ログアウトしました" });
    });
  }
};
