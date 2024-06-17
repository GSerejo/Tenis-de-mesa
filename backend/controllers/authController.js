// authController.js

import { openDb } from '../configDB.js';
import bcrypt from 'bcrypt';

// Função para autenticar um usuário
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM Users WHERE username = ?', [username]);
    
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        msg: "Usuário não encontrado"
      });
    }

    // Comparar a senha fornecida com a senha armazenada no banco de dados usando bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({
        statusCode: 200,
        msg: "Login bem-sucedido",
        user: {
          id: user.id,
          username: user.username
          // outras informações do usuário, se necessário
        }
      });
    } else {
      res.status(401).json({
        statusCode: 401,
        msg: "Credenciais inválidas"
      });
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error.message);
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao autenticar usuário",
      error: error.message
    });
  }
}

// Outras funções relacionadas ao gerenciamento de autenticação podem ser implementadas aqui, se necessário
