const Roup = require('../models/roup'); // Modelo com letra maiúscula por convenção

// Criar nova roupa
exports.createRoup = async (req, res) => {
    try {
        const { codigo, name, valor, tipo } = req.body;
        const novaRoup = new Roup({ codigo, name, valor, tipo });
        await novaRoup.save();
        res.status(201).json(novaRoup);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as roupas
exports.getRoup = async (req, res) => {
    try {
        const roupas = await Roup.find();
        res.status(200).json(roupas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar uma roupa específica por ID
exports.getRoupById = async (req, res) => {
    try {
        const roupa = await Roup.findById(req.params.id);
        if (!roupa) {
            return res.status(404).json({ message: 'Roupa não encontrada' });
        }
        res.status(200).json(roupa);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar roupa
exports.updateRoup = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, name, valor, tipo } = req.body;

        const roupaAtualizada = await Roup.findByIdAndUpdate(
            id,
            { codigo, name, valor, tipo },
            { new: true }
        );

        if (!roupaAtualizada) {
            return res.status(404).json({ message: 'Roupa não encontrada' });
        }

        res.status(200).json(roupaAtualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir roupa
exports.deleteRoup = async (req, res) => {
    try {
        const { id } = req.params;
        const roupaRemovida = await Roup.findByIdAndDelete(id);

        if (!roupaRemovida) {
            return res.status(404).json({ message: 'Roupa não encontrada' });
        }

        res.status(200).json({ message: 'Roupa excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
