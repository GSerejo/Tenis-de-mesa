import { openDb } from "../configDB.js";

export async function createUsersTable() {
  try {
    const db = await openDb();
    await db.exec('CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
    console.log("Tabela Users criada ou já existe.");
  } catch (error) {
    console.error("Erro ao criar tabela Users:", error.message);
  }
}
