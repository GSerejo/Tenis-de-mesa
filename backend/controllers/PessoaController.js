// controllers/PessoaController.js

import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from '../models/Pessoa.js';

export async function getPessoas(req, res) {
  try {
    const pessoas = await selectPessoas();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao buscar pessoas",
      error: error.message
    });
  }
}

export async function getPessoa(req, res) {
  const { id } = req.params;
  try {
    const pessoa = await selectPessoa(id);
    if (!pessoa) {
      return res.status(404).json({
        statusCode: 404,
        msg: "Pessoa não encontrada"
      });
    }
    res.json(pessoa);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao buscar a pessoa",
      error: error.message
    });
  }
}

export async function criarPessoa(req, res) {
  const pessoa = req.body;
  try {
    await insertPessoa(pessoa);
    res.status(201).json({
      statusCode: 201,
      msg: "Pessoa inserida com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao inserir pessoa",
      error: error.message
    });
  }
}

export async function atualizarPessoa(req, res) {
  const { id } = req.params;
  const pessoa = req.body;
  try {
    await updatePessoa(pessoa);
    res.json({
      statusCode: 200,
      msg: "Pessoa atualizada com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao atualizar pessoa",
      error: error.message
    });
  }
}

export async function deletarPessoa(req, res) {
  const { id } = req.params;
  try {
    await deletePessoa(id);
    res.json({
      statusCode: 200,
      msg: "Pessoa deletada com sucesso"
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      msg: "Erro ao deletar pessoa",
      error: error.message
    });
  }
}
