document.addEventListener('DOMContentLoaded', function () {
    displayClients();

    document.getElementById('salvar').addEventListener('click', saveClient);
});

function getClients() {
    return JSON.parse(localStorage.getItem('clients')) || [];
}

function saveClients(clients) {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function displayClients() {
    const clients = getClients();
    const tbody = document.querySelector('#tableClient tbody');
    tbody.innerHTML = '';

    clients.forEach((client, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.nome}</td>
            <td>${client.email}</td>
            <td>${client.celular}</td>
            <td>${client.endereco}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editClient(${index})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-danger btn-sm" onclick="deleteClient(${index})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function saveClient() {
    const clients = getClients();
    const index = document.getElementById('nome').dataset.index;

    const client = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        endereco: document.getElementById('endereco').value
    };

    if (index === 'new' || index === undefined) {
        clients.push(client);
    } else {
        clients[index] = client;
    }

    saveClients(clients);
    displayClients();
    clearForm();
}

function editClient(index) {
    const clients = getClients();
    const client = clients[index];

    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('endereco').value = client.endereco;
    document.getElementById('nome').dataset.index = index;
}

function deleteClient(index) {
    const clients = getClients();
    clients.splice(index, 1);
    saveClients(clients);
    displayClients();
}

function clearForm() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('nome').dataset.index = 'new';
}


