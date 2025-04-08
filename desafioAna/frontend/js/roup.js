document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://127.0.0.1:3000';
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const addUserBtn = document.getElementById('addUserBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editUserId = null;

    // Carregar produtos
    const loadUsers = async () => {
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();
        const tableBody = document.querySelector('#usersTable tbody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.codigo}</td>
                <td>${product.nome}</td>
                <td>${product.valor}</td>
                <td>${product.tipo}</td>
                <td>
                    <button class="editUserBtn" data-id="${product._id}">Editar</button>
                    <button class="deleteUserBtn" data-id="${product._id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editUserBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditUserModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteUserBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteUser(e.target.dataset.id));
        });
    };

    const addUser = async (product) => {
        await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        loadUsers();
    };

    const updateUser = async (id, product) => {
        await fetch(`${apiUrl}/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        loadUsers();
    };

    const deleteUser = async (id) => {
        await fetch(`${apiUrl}/products/${id}`, {
            method: 'DELETE'
        });
        loadUsers();
    };

    const openEditUserModal = async (id) => {
        editUserId = id;
        modalTitle.innerText = 'Editar Produto';

        const response = await fetch(`${apiUrl}/api/roupas`);
        const product = await response.json();

        document.getElementById('codigo').value = product.codigo;
        document.getElementById('nome').value = product.nome;
        document.getElementById('valor').value = product.valor;
        document.getElementById('tipo').value = product.tipo;

        userModal.style.display = 'block';
    };

    const openAddUserModal = () => {
        editUserId = null;
        modalTitle.innerText = 'Adicionar Produto';
        userForm.reset();
        userModal.style.display = 'block';
    };

    document.querySelector('.close').addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === userModal) {
            userModal.style.display = 'none';
        }
    });

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const productData = {
            codigo: document.getElementById('codigo').value,
            nome: document.getElementById('nome').value,
            valor: document.getElementById('valor').value,
            tipo: document.getElementById('tipo').value
        };

        if (editUserId) {
            await updateUser(editUserId, productData);
        } else {
            await addUser(productData);
        }

        userModal.style.display = 'none';
        loadUsers();
    });

    addUserBtn.addEventListener('click', openAddUserModal);
    loadUsers();
});
