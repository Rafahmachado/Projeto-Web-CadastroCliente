// Função para obter pedidos do localStorage
function getPedidos() {
    const pedidos = localStorage.getItem('pedidos');
    return pedidos ? JSON.parse(pedidos) : [];
}

// Função para salvar pedidos no localStorage
function savePedidos(pedidos) {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Função para cadastrar um novo pedido
function cadastrarPedido() {
    const cliente = document.getElementById('cliente').value;
    const itens = document.getElementById('itens').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    const status = document.getElementById('status').value;

    if (!cliente || !itens || !quantidade || !preco || !status) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const pedidos = getPedidos();
    const novoPedido = {
        cliente,
        itens,
        quantidade,
        preco,
        status,
        id: Date.now() // Usando timestamp como identificador único
    };

    pedidos.push(novoPedido);
    savePedidos(pedidos);
    alert('Pedido cadastrado com sucesso!');
    document.getElementById('formPedido').reset();
}

// Função para exibir pedidos na tabela
function exibirPedidos() {
    const pedidos = getPedidos();
    const tabela = document.getElementById('tabelaPedidos').getElementsByTagName('tbody')[0];

    tabela.innerHTML = ''; // Limpar tabela existente

    pedidos.forEach(pedido => {
        const row = tabela.insertRow();
        row.insertCell(0).innerText = pedido.cliente;
        row.insertCell(1).innerText = pedido.itens;
        row.insertCell(2).innerText = pedido.quantidade;
        row.insertCell(3).innerText = pedido.preco;
        row.insertCell(4).innerText = pedido.status;

        const acoes = row.insertCell(5);
        acoes.innerHTML = `
            <a href="edicao-pedido.html?id=${pedido.id}" class="btn btn-warning btn-sm">Editar</a>
            <button onclick="deletarPedido(${pedido.id})" class="btn btn-danger btn-sm">Excluir</button>
        `;
    });
}

// Função para editar um pedido
function editarPedido() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'), 10);

    const pedidos = getPedidos();
    const pedido = pedidos.find(p => p.id === id);

    if (pedido) {
        document.getElementById('cliente').value = pedido.cliente;
        document.getElementById('itens').value = pedido.itens;
        document.getElementById('quantidade').value = pedido.quantidade;
        document.getElementById('preco').value = pedido.preco;
        document.getElementById('status').value = pedido.status;
        document.getElementById('pedidoId').value = pedido.id;
    }
}

// Função para salvar as alterações no pedido
function salvarEdicao() {
    const id = parseInt(document.getElementById('pedidoId').value, 10);
    const cliente = document.getElementById('cliente').value;
    const itens = document.getElementById('itens').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    const status = document.getElementById('status').value;

    const pedidos = getPedidos();
    const index = pedidos.findIndex(p => p.id === id);

    if (index !== -1) {
        pedidos[index] = { id, cliente, itens, quantidade, preco, status };
        savePedidos(pedidos);
        alert('Pedido atualizado com sucesso!');
        window.location.href = 'consulta-pedido.html';
    }
}

// Função para excluir um pedido
function deletarPedido(id) {
    const pedidos = getPedidos();
    const novosPedidos = pedidos.filter(p => p.id !== id);
    savePedidos(novosPedidos);
    alert('Pedido excluído com sucesso!');
    exibirPedidos(); // Atualizar tabela após exclusão
}

// Inicialização das páginas
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('formPedido')) {
        document.getElementById('salvarPedido').addEventListener('click', cadastrarPedido);
    }
    if (document.getElementById('tabelaPedidos')) {
        exibirPedidos();
    }
    if (document.getElementById('pedidoId')) {
        editarPedido();
        document.getElementById('salvarEdicao').addEventListener('click', salvarEdicao);
    }
});
