// routes/atletas.js

import express from 'express';
import { criarAtleta } from '../controllers/AtletaController.js';

const router = express.Router();

router.post('/', criarAtleta);

export default router;
