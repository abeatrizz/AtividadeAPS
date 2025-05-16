const AutorModel = require('../models/autorModel');

class AutorController {
  constructor(db) {
    this.model = new AutorModel(db);
  }

  // Criar um novo autor
  async criar(req, res) {
    try {
      const autor = req.body;
      
      // Validações básicas
      if (!autor.nome) {
        return res.status(400).json({ erro: 'Nome do autor é obrigatório' });
      }
      
      const novoAutor = await this.model.criar(autor);
      res.status(201).json(novoAutor);
    } catch (erro) {
      console.error('Erro ao criar autor:', erro);
      res.status(500).json({ erro: 'Erro ao criar autor' });
    }
  }

  // Listar todos os autores
  async listar(req, res) {
    try {
      const autores = await this.model.listarTodos();
      res.json(autores);
    } catch (erro) {
      console.error('Erro ao listar autores:', erro);
      res.status(500).json({ erro: 'Erro ao listar autores' });
    }
  }

  // Buscar autor por ID
  async buscarPorId(req, res) {
    try {
      const id = req.params.id;
      const autor = await this.model.buscarPorId(id);
      
      if (!autor) {
        return res.status(404).json({ erro: 'Autor não encontrado' });
      }
      
      res.json(autor);
    } catch (erro) {
      console.error('Erro ao buscar autor:', erro);
      res.status(500).json({ erro: 'Erro ao buscar autor' });
    }
  }

  // Atualizar autor
  async atualizar(req, res) {
    try {
      const id = req.params.id;
      const autor = req.body;
      
      // Validações básicas
      if (!autor.nome) {
        return res.status(400).json({ erro: 'Nome do autor é obrigatório' });
      }
      
      // Verifica se o autor existe
      const autorExistente = await this.model.buscarPorId(id);
      if (!autorExistente) {
        return res.status(404).json({ erro: 'Autor não encontrado' });
      }
      
      const resultado = await this.model.atualizar(id, autor);
      res.json(resultado);
    } catch (erro) {
      console.error('Erro ao atualizar autor:', erro);
      res.status(500).json({ erro: 'Erro ao atualizar autor' });
    }
  }

  // Excluir autor
  async excluir(req, res) {
    try {
      const id = req.params.id;
      
      // Verifica se o autor existe
      const autorExistente = await this.model.buscarPorId(id);
      if (!autorExistente) {
        return res.status(404).json({ erro: 'Autor não encontrado' });
      }
      
      // Verifica se o autor tem livros
      const livrosDoAutor = await this.model.listarLivros(id);
      if (livrosDoAutor && livrosDoAutor.length > 0) {
        return res.status(400).json({ 
          erro: 'Não é possível excluir o autor pois existem livros associados a ele'
        });
      }
      
      const resultado = await this.model.excluir(id);
      res.json(resultado);
    } catch (erro) {
      console.error('Erro ao excluir autor:', erro);
      res.status(500).json({ erro: 'Erro ao excluir autor' });
    }
  }

  // Listar livros de um autor
  async listarLivros(req, res) {
    try {
      const id = req.params.id;
      
      // Verifica se o autor existe
      const autorExistente = await this.model.buscarPorId(id);
      if (!autorExistente) {
        return res.status(404).json({ erro: 'Autor não encontrado' });
      }
      
      const livros = await this.model.listarLivros(id);
      res.json(livros);
    } catch (erro) {
      console.error('Erro ao listar livros do autor:', erro);
      res.status(500).json({ erro: 'Erro ao listar livros do autor' });
    }
  }
}

module.exports = AutorController;
