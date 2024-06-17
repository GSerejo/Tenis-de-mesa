// backend/controllers/userController.js

import { openDb } from '../configDB.js';

// Exemplo de função para criar um usuário
export async function createUser(username, password) {
  try {
    const db = await openDb();
    await db.run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password]);
    console.log("Usuário criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar usuário:", error.message);
    throw error; // Tratar o erro ou passar para um middleware de tratamento de erros
  }
}

// Exemplo de função para autenticar um usuário
export async function authenticateUser(username, password) {
  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM Users WHERE username = ?', [username]);
    
    if (!user) {
      return null; // Usuário não encontrado
    }

    // Aqui você deve verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    // Normalmente você usaria bcrypt para verificar senhas criptografadas
    
    if (user.password === password) {
      return user; // Autenticação bem-sucedida, retornar dados do usuário
    } else {
      return null; // Senha incorreta
    }
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error.message);
    throw error; // Tratar o erro ou passar para um middleware de tratamento de erros
  }
}

// Outras funções relacionadas ao gerenciamento de usuários podem ser implementadas aqui, como atualizar usuário, excluir usuário, listar usuários, etc.
