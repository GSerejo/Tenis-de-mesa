import express from 'express';
import { insertPessoa, updatePessoa, selectPessoas, selectPessoa, deletePessoa } from '../controller/Pessoa.js';

const router = express.Router();

router.get('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
    const pessoa = req.body;
    const { id } = req.params;
    if (!pessoa || !pessoa.id) {
        return res.status(400).json({
            statusCode: 400,
            msg: "Você precisa informar um id"
        });
    }

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
});

router.post('/', async (req, res) => {
    try {
        await insertPessoa(req.body);
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
});

export default router;
