// controllers/ContadorController.js

let contadorEsquerda = 0;
let contadorDireita = 0;

export function atualizarContador(req, res) {
    const { lado, valor } = req.body;

    try {
        if (lado === 'esquerda') {
            contadorEsquerda = valor;
        } else if (lado === 'direita') {
            contadorDireita = valor;
        } else {
            throw new Error('Lado inválido');
        }

        res.status(200).json({ msg: 'Contador atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar contador:', error);
        res.status(500).json({ msg: 'Erro ao atualizar contador. Tente novamente mais tarde.' });
    }
}

export function obterContador(req, res) {
    try {
        res.status(200).json({ contadorEsquerda, contadorDireita });
    } catch (error) {
        console.error('Erro ao obter contador:', error);
        res.status(500).json({ msg: 'Erro ao obter contador. Tente novamente mais tarde.' });
    }
}
