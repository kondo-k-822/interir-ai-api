import { Pool } from "pg";

export const pool = new Pool({
  user: "myuser",
  host: "localhost",
  database: "interirAiDB",
  password: "mypassword",
  port: 15432,
});
