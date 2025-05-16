class AutorModel {
  constructor(db) {
    this.db = db;
  }

  // Criar um novo autor
  criar(autor) {
    return new Promise((resolve, reject) => {
      const { nome, nacionalidade, data_nascimento } = autor;
      const sql = `INSERT INTO autores (nome, nacionalidade, data_nascimento) 
                  VALUES (?, ?, ?)`;
      
      this.db.run(sql, [nome, nacionalidade, data_nascimento], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...autor });
        }
      });
    });
  }

  // Listar todos os autores
  listarTodos() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM autores`;
      
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Buscar autor por ID
  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM autores WHERE id = ?`;
      
      this.db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Atualizar autor
  atualizar(id, autor) {
    return new Promise((resolve, reject) => {
      const { nome, nacionalidade, data_nascimento } = autor;
      const sql = `UPDATE autores 
                  SET nome = ?, nacionalidade = ?, data_nascimento = ? 
                  WHERE id = ?`;
      
      this.db.run(sql, [nome, nacionalidade, data_nascimento, id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...autor, changes: this.changes });
        }
      });
    });
  }

  // Excluir autor
  excluir(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM autores WHERE id = ?`;
      
      this.db.run(sql, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, changes: this.changes });
        }
      });
    });
  }

  // Listar livros de um autor
  listarLivros(autorId) {
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

module.exports = AutorModel;
