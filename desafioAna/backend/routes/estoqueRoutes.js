const express = require('express');
const router = express.Router();
const {
    createEstoque,
    getEstoque,
    getEstoqueById,
    updateEstoque,
    deleteEstoque
} = require('../controllers/estoqueController');

// Rotas de Estoque
router.post('/', createEstoque);        // Criar novo estoque
router.get('/', getEstoque);            // Listar todos os estoques
router.get('/:id', getEstoqueById);     // Obter estoque por ID
router.put('/:id', updateEstoque);      // Atualizar estoque por ID
router.delete('/:id', deleteEstoque);   // Deletar estoque por ID

module.exports = router;
