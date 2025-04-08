const Estoque = require('../models/estoque');

// Criar novo estoque
exports.createEstoque = async (req, res) => {
    try {
        const { quantidade, name, codigo } = req.body;
        const novoEstoque = new Estoque({ quantidade, name, codigo });
        await novoEstoque.save();
        res.status(201).json(novoEstoque);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todo o estoque
exports.getEstoque = async (req, res) => {
    try {
        const listaEstoque = await Estoque.find();
        res.status(200).json(listaEstoque);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter um item do estoque por ID
exports.getEstoqueById = async (req, res) => {
    try {
        const itemEstoque = await Estoque.findById(req.params.id);
        if (!itemEstoque) {
            return res.status(404).json({ message: 'Estoque não encontrado' });
        }
        res.status(200).json(itemEstoque);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar um item do estoque
exports.updateEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade, name, codigo } = req.body;

        const estoqueAtualizado = await Estoque.findByIdAndUpdate(
            id,
            { quantidade, name, codigo },
            { new: true }
        );

        if (!estoqueAtualizado) {
            return res.status(404).json({ message: 'Estoque não encontrado' });
        }

        res.status(200).json(estoqueAtualizado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar um item do estoque
exports.deleteEstoque = async (req, res) => {
    try {
        const { id } = req.params;
        const estoqueRemovido = await Estoque.findByIdAndDelete(id);

        if (!estoqueRemovido) {
            return res.status(404).json({ message: 'Estoque não encontrado' });
        }

        res.status(200).json({ message: 'Estoque excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
