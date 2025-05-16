const LivroModel = require('../models/livroModel');

class LivroController {
  constructor(db) {
    this.model = new LivroModel(db);
  }

  // Criar um novo livro
  async criar(req, res) {
    try {
      const livro = req.body;
      
      // Validações básicas
      if (!livro.titulo) {
        return res.status(400).json({ erro: 'Título do livro é obrigatório' });
      }
      
      if (!livro.autor_id) {
        return res.status(400).json({ erro: 'ID do autor é obrigatório' });
      }
      
      const novoLivro = await this.model.criar(livro);
      res.status(201).json(novoLivro);
    } catch (erro) {
      console.error('Erro ao criar livro:', erro);
      res.status(500).json({ erro: 'Erro ao criar livro' });
    }
  }

  // Listar todos os livros
  async listar(req, res) {
    try {
      const livros = await this.model.listarTodos();
      res.json(livros);
    } catch (erro) {
      console.error('Erro ao listar livros:', erro);
      res.status(500).json({ erro: 'Erro ao listar livros' });
    }
  }

  // Buscar livro por ID
  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const livro = await this.model.buscarPorId(id);
      
      if (!livro) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      res.json(livro);
    } catch (erro) {
      console.error('Erro ao buscar livro:', erro);
      res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
  }

  // Atualizar livro
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const livro = req.body;
      
      // Validações básicas
      if (!livro.titulo) {
        return res.status(400).json({ erro: 'Título do livro é obrigatório' });
      }
      
      if (!livro.autor_id) {
        return res.status(400).json({ erro: 'ID do autor é obrigatório' });
      }
      
      // Verifica se o livro existe
      const livroExistente = await this.model.buscarPorId(id);
      if (!livroExistente) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      const resultado = await this.model.atualizar(id, livro);
      res.json(resultado);
    } catch (erro) {
      console.error('Erro ao atualizar livro:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar livro' });
    }
  }

  // Excluir livro
  async excluir(req, res) {
    try {
      const id = req.params.id;
      
      // Verifica se o livro existe
      const livroExistente = await this.model.buscarPorId(id);
      if (!livroExistente) {
        return res.status(404).json({ erro: 'Livro não encontrado' });
      }
      
      const resultado = await this.model.excluir(id);
      res.json(resultado);
    } catch (erro) {
      console.error('Erro ao excluir livro:', erro);
      res.status(500).json({ erro: 'Erro ao excluir livro' });
    }
  }

  // Buscar livros por autor
  async buscarPorAutor(req, res) {
    try {
      const autorId = req.params.autorId;
      const livros = await this.model.buscarPorAutor(autorId);
      res.json(livros);
    } catch (erro) {
      console.error('Erro ao buscar livros por autor:', erro);
      res.status(500).json({ erro: 'Erro ao buscar livros por autor' });
    }
  }
}

module.exports = LivroController;
