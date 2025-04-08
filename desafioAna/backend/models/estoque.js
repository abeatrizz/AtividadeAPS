const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
    quantidade: { type: Number, required: true },
    name: { type: String, required: true },
    codigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Roup', required: true } 
});

const Estoque = mongoose.model('Estoque', estoqueSchema);

module.exports = Estoque;
