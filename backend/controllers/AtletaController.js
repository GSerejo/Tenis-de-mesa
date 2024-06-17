// controllers/AtletaController.js

import { insertAtleta } from '../models/Atleta.js'; // Importe a função que insere o atleta no banco de dados

export async function criarAtleta(req, res) {
    const { nome, idade } = req.body;

    try {
        await insertAtleta({ nome, idade });
        res.status(201).json({ msg: 'Atleta cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar atleta:', error);
        res.status(500).json({ msg: 'Erro ao cadastrar atleta. Tente novamente mais tarde.' });
    }
}
