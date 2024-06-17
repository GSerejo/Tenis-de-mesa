// app.js

import express from 'express';
import dotenv from 'dotenv';
import { createTable as createPessoaTable } from './models/Pessoa.js'; // Importe as funções necessárias diretamente
import pessoaRoutes from './routes/pessoaRoutes.js';
import authRoutes from './routes/auth.js';
import { createUsersTable } from './createTableUsers.js';
import { openDb } from './configDB.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API Rodando!");
});

app.use('/pessoas', pessoaRoutes);
app.use('/auth', authRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

// Função para criar a tabela Users ao iniciar
async function initializeApp() {
  try {
    await createUsersTable();
    await createPessoaTable(); // Chame a função de criação de tabela para Pessoa
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`API rodando na porta ${PORT}...`));
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error.message);
    process.exit(1); // Encerra o processo com código de erro
  }
}

// Inicializa a aplicação
initializeApp();
