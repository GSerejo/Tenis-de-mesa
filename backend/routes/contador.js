// routes/contador.js

import express from 'express';
import { atualizarContador, obterContador } from '../controllers/ContadorController.js';

const router = express.Router();

router.post('/', atualizarContador);
router.get('/', obterContador);

export default router;
