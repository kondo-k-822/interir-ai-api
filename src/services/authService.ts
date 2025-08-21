import bcrypt from "bcrypt";
import { pool } from "../db/db";

export const authService = {
  signup: async (username: string, password: string) => {
    // ユーザー存在確認
    const existing = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    if (existing.rows.length > 0) {
      throw new Error("メールアドレスは既に登録されています");
    }

    // パスワードハッシュ化
    const hash = await bcrypt.hash(password, 10);

    // 登録
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hash]
    );

    return { id: result.rows[0].id, username: result.rows[0].username };
  },

  login: async (username: string, password: string) => {
    // ユーザー検索
    const result = await pool.query(
      "SELECT id, username, password FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      throw new Error("ユーザー名またはパスワードが違います");
    }

    const user = result.rows[0];

    // パスワード比較
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new Error("ユーザー名またはパスワードが違います");
    }

    return { id: user.id, username: user.username };
  },
};
