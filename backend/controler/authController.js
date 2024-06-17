import { openDb } from "../configDB.js";

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password]);
    if (user) {
      res.json({
        statusCode: 200,
        msg: "Login realizado com sucesso",
        user: user
      });
    } else {
      res.status(401).json({
        statusCode: 401,
        msg: "Credenciais inválidas"
      });
    }
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao realizar login",
      error: error.message
    });
  }
}
