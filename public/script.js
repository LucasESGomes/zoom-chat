// Cria uma instância do Socket.IO
const socket = io();
// Seleciona o input da mensagem
const mensagemInput = document.getElementById('mensagem');
// Seleciona a lista de mensagens
const mensagens = document.getElementById('mensagens');
// Seleciona o modal e elementos relacionados
const userModal = document.getElementById('userModal');
const modalNomeInput = document.getElementById('modalNome');
const entrarChatBtn = document.getElementById('entrarChat');
const nomeDisplay = document.getElementById('nome-display');
// Variável para armazenar o nome do usuário
let userName = '';

// Mostra o modal ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    userModal.classList.remove('hidden');
});

// Configura o evento para entrar no chat
entrarChatBtn.addEventListener('click', () => {
    const nome = modalNomeInput.value.trim();
    if (nome) {
        userName = nome;
        userModal.classList.add('hidden');
        nomeDisplay.textContent = `Você está conectado como: ${userName}`;
    }
});

// Permite pressionar Enter para enviar o nome
modalNomeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        entrarChatBtn.click();
    }
});

// Adiciona um evento de escuta para o envio do formulário
document.querySelector('form').addEventListener('submit', event => {
    // Previne o envio padrão do formulário
    event.preventDefault();
    // Obtém o valor do input da mensagem
    const mensagem = mensagemInput.value;
    // Verifica se a mensagem foi preenchida
    if (mensagem.trim() && userName) {
        socket.emit('chat message', { nome: userName, mensagem });
        // Limpa o input da mensagem
        mensagemInput.value = '';
    }
});

// Adiciona um evento de escuta para o evento de mensagem recebido do servidor
socket.on('chat message', dados => {
    // Cria um elemento de lista para exibir a mensagem
    const lista = document.createElement('li');
    // Cria um elemento strong para o nome
    const nomeElement = document.createElement('strong');
    nomeElement.textContent = `${dados.nome}:`;
    // Adiciona o nome e a mensagem
    lista.appendChild(nomeElement);
    lista.appendChild(document.createTextNode(` ${dados.mensagem}`));
    // Adiciona o elemento de lista à lista de mensagens
    mensagens.appendChild(lista);
    // Rolagem automática para a última mensagem
    mensagens.scrollTop = mensagens.scrollHeight;
});

// Botão para fechar o chat (simulação)
document.getElementById('fecharChat').addEventListener('click', () => {
    alert('Funcionalidade de fechar chat seria implementada aqui');
});