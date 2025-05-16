const express = require('express');
const AutorController = require('../controllers/autorController');

const router = express.Router();

// Middleware para inicializar o controller com a conexão do banco de dados
router.use((req, res, next) => {
  req.autorController = new AutorController(req.app.locals.db);
  next();
});

// Rotas
router.post('/', (req, res) => req.autorController.criar(req, res));
router.get('/', (req, res) => req.autorController.listar(req, res));
router.get('/:id', (req, res) => req.autorController.buscarPorId(req, res));
router.put('/:id', (req, res) => req.autorController.atualizar(req, res));
router.delete('/:id', (req, res) => req.autorController.excluir(req, res));
router.get('/:id/livros', (req, res) => req.autorController.listarLivros(req, res));

module.exports = router;
