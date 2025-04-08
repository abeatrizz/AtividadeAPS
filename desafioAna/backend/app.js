const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const roupRoutes = require('./routes/roupRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Faz o parser do corpo JSON

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/lojaDeRoupas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB!'))
.catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rotas da API
app.use('/api/roupas', roupRoutes);     // Rota para roupas
app.use('/api/estoque', estoqueRoutes); // Rota para estoque

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
