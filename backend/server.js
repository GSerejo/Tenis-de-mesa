const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/seu-banco-de-dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definição do esquema para a partida
const partidaSchema = new mongoose.Schema({
    player1Name: String,
    player2Name: String,
    setsWonLeft: Number,
    setsWonRight: Number,
    winner: String // Adicionei um campo para armazenar o vencedor da partida
    // Você pode adicionar outros campos conforme necessário
});

const Partida = mongoose.model('Partida', partidaSchema);

// Middleware para parsear o body das requisições
app.use(bodyParser.json());

// Rota para finalizar a partida e salvar os dados no banco
app.post('/finalizar-partida', async (req, res) => {
    const { player1Name, player2Name, setsWonLeft, setsWonRight, winner } = req.body;

    const novaPartida = new Partida({
        player1Name,
        player2Name,
        setsWonLeft,
        setsWonRight,
        winner
        // Adicione outros campos conforme necessário
    });

    try {
        await novaPartida.save();
        res.status(201).send('Partida finalizada e dados salvos com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar os dados da partida:', error);
        res.status(500).send('Erro ao salvar os dados da partida. Verifique o console para mais detalhes.');
    }
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
