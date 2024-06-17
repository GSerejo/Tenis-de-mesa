// models/Pessoa.js

import { openDb } from '../configDB.js';

export async function createTable() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome TEXT, idade INTEGER)');
    console.log("Tabela Pessoa criada ou já existe.");
  } catch (error) {
    console.error("Erro ao criar tabela Pessoa:", error.message);
  }
}

export async function insertPessoa(pessoa) {
  try {
    const db = await openDb();
    await db.run('INSERT INTO Pessoa (nome, idade) VALUES (?, ?)', [pessoa.nome, pessoa.idade]);
    console.log("Pessoa inserida com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir pessoa:", error.message);
  }
}

export async function updatePessoa(pessoa) {
  try {
    const db = await openDb();
    await db.run('UPDATE Pessoa SET nome = ?, idade = ? WHERE id = ?', [pessoa.nome, pessoa.idade, pessoa.id]);
    console.log("Pessoa atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar pessoa:", error.message);
  }
}

export async function selectPessoas() {
  try {
    const db = await openDb();
    const pessoas = await db.all('SELECT * FROM Pessoa');
    console.log("Pessoas selecionadas com sucesso.");
    return pessoas;
  } catch (error) {
    console.error("Erro ao selecionar pessoas:", error.message);
    return [];
  }
}

export async function selectPessoa(id) {
  try {
    const db = await openDb();
    const pessoa = await db.get('SELECT * FROM Pessoa WHERE id = ?', [id]);
    console.log("Pessoa selecionada com sucesso.");
    return pessoa;
  } catch (error) {
    console.error("Erro ao selecionar pessoa:", error.message);
    return null;
  }
}

export async function deletePessoa(id) {
  try {
    const db = await openDb();
    await db.run('DELETE FROM Pessoa WHERE id = ?', [id]);
    console.log("Pessoa deletada com sucesso.");
  } catch (error) {
    console.error("Erro ao deletar pessoa:", error.message);
  }
}
