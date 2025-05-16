class LivroModel {
  constructor(db) {
    this.db = db;
  }

  // Criar um novo livro
  criar(livro) {
    return new Promise((resolve, reject) => {
      const { titulo, ano_publicacao, genero, autor_id } = livro;
      const sql = `INSERT INTO livros (titulo, ano_publicacao, genero, autor_id) 
                  VALUES (?, ?, ?, ?)`;
      
      this.db.run(sql, [titulo, ano_publicacao, genero, autor_id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...livro });
        }
      });
    });
  }

  // Listar todos os livros
  listarTodos() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT l.*, a.nome as autor_nome 
                  FROM livros l
                  LEFT JOIN autores a ON l.autor_id = a.id`;
      
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Buscar livro por ID
  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT l.*, a.nome as autor_nome 
                  FROM livros l
                  LEFT JOIN autores a ON l.autor_id = a.id
                  WHERE l.id = ?`;
      
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Atualizar livro
  atualizar(id, livro) {
    return new Promise((resolve, reject) => {
      const { titulo, ano_publicacao, genero, autor_id } = livro;
      const sql = `UPDATE livros 
                  SET titulo = ?, ano_publicacao = ?, genero = ?, autor_id = ? 
                  WHERE id = ?`;
      
      this.db.run(sql, [titulo, ano_publicacao, genero, autor_id, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...livro, changes: this.changes });
        }
      });
    });
  }

  // Excluir livro
  excluir(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM livros WHERE id = ?`;
      
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  // Buscar livros por autor
  buscarPorAutor(autorId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM livros WHERE autor_id = ?`;
      
      this.db.all(sql, [autorId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = LivroModel;
