const mongoose = require('mongoose');

const roupSchema = new mongoose.Schema({
    codigo: { type: Number, required: true },
    name: { type: String, required: true },
    valor: { type: Number, required: true },
    tipo: { 
        type: String, 
        enum: ['calça', 'vestido', 'blusa', 'acessório', 'short', 'saia'], 
        required: true 
    }
});

const Roup = mongoose.model('Roup', roupSchema);

module.exports = Roup;
