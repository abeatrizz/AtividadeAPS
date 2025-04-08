const express = require('express');
const router = express.Router();
const {
    createRoup,
    getRoup,
    getRoupById,
    updateRoup,
    deleteRoup
} = require('../controllers/roupController');

// Rotas de Roupas
router.post('/', createRoup);        // Criar nova roupa
router.get('/', getRoup);            // Listar todas as roupas
router.get('/:id', getRoupById);     // Obter roupa por ID
router.put('/:id', updateRoup);      // Atualizar roupa por ID
router.delete('/:id', deleteRoup);   // Deletar roupa por ID

module.exports = router;
