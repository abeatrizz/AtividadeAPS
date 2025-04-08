document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:3000';
    const estoqueModal = document.getElementById('estoqueModal');
    const estoqueForm = document.getElementById('estoqueForm');
    const addEstoqueBtn = document.getElementById('addEstoqueBtn');
    const modalTitleEstoque = document.getElementById('modalTitleEstoque');
    let editEstoqueId = null;

    // Função para carregar estoque
    const loadEstoque = async () => {
        const response = await fetch(`${apiUrl}/estoque`,  {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estoque),
            redirect: 'follow'
        });
        const estoque = await response.json();
        const tableBody = document.querySelector('#estoqueTable tbody');
        tableBody.innerHTML = '';

        estoque.forEach(estoque => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${estoque.quantidade}</td>
                <td>${estoque.name}</td>
                <td>${estoque.codigo ? estoque.codigo.name : 'N/A'}</td>
                <td>
                    <button class="editEstoqueBtn" data-id="${estoque._id}">Editar</button>
                    <button class="deleteEstoqueBtn" data-id="${estoque._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Adicionar eventos de edição e deleção
        document.querySelectorAll('.editEstoqueBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditEstoqueModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteEstoqueBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteEstoque(e.target.dataset.id));
        });
    };

    // Função para adicionar estoque
    const addEstoque = async (estoque) => {
        await fetch(`${apiUrl}/estoque`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estoque)
        });
        loadEstoque();
    };

    // Função para atualizar estoque
    const updateEstoque = async (id, estoque) => {
        await fetch(`${apiUrl}/estoque/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estoque)
        });
        loadEstoque();
    };

    // Função para deletar estoque
    const deleteEstoque = async (id) => {
        await fetch(`${apiUrl}/estoque/${id}`, {
            method: 'DELETE'
        });
        loadEstoque();
    };

    // Abrir modal para editar estoque
    const openEditEstoqueModal = async (id) => {
        editEstoqueId = id;
        modalTitleEstoque.innerText = 'Editar Estoque';

        // Buscar os dados do estoque para preencher o modal
        const response = await fetch(`${apiUrl}/estoque/${id}`);
        if (response.status === 404) {
            console.error('Estoque não encontrado');
            return;
        }
        const estoque = await response.json();

        document.getElementById('nameEstoque').value = estoque.name;
        document.getElementById('quantidade').value = estoque.quantidade;
        await loadUsers(estoque.codigo ? estoque.codigo._id : null);

        estoqueModal.style.display = 'block';
    };

    // Abrir modal para adicionar novo estoque
    const openAddEstoqueModal = async () => {
        editEstoqueId = null;
        modalTitleEstoque.innerText = 'Adicionar Estoque';
        estoqueForm.reset();
        await loadRoup(); // Carrega as roupas sem pré-selecionar nenhum
        estoqueModal.style.display = 'block';
    };

    // Carregar usuários para o select de responsável
    const loadRoup = async (selectedRoupId = null) => {
        const response = await fetch(`${apiUrl}/roup`);
        const roup = await response.json();
        const select = document.getElementById('codigo');
        select.innerHTML = ''; // Limpa o select

        roup.forEach(roup => {
            const option = document.createElement('option');
            option.value = roup._id;
            option.text = roup.name;
            if (roup._id === selectedRoupId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        estoqueModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === estoqueModal) {
            estoqueModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    estoqueForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const estoqueData = {
            quantidade: document.getElementById('quantidade').value,
            name: document.getElementById('nameEstoque').value,
            codigo: document.getElementById('codigo').value
        };

        if (editEstoqueId) {
            await updateEstoque(editEstoqueId, estoqueData);
        } else {
            await addEstoque(estoqueData);
        }

        estoqueModal.style.display = 'none';
        loadEstoque();
    });

    // Inicializando o carregamento de estoque
    addEstoqueBtn.addEventListener('click', openAddEstoqueModal);
    loadEstoque();
});
