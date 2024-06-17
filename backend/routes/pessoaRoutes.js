import express from 'express';
import { getPessoas, getPessoa, criarPessoa, atualizarPessoa, deletarPessoa } from '../controllers/PessoaController.js';

const router = express.Router();

router.get('/', getPessoas);
router.get('/:id', getPessoa);
router.post('/', criarPessoa);
router.put('/:id', atualizarPessoa);
router.delete('/:id', deletarPessoa);

export default router;
