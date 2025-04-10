// Importe o express corretamente (com 'require') e chame a função
const express = require('express');
const app = express();  // Agora sim, chame a função express()

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Configura o middleware para servir arquivos estáticos
app.use(express.static('public'));

// Rota para a página principal
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

io.on('connection', (socket) => {
  console.log('Usuário conectado');
  socket.on('chat message', (data) => io.emit('chat message', data));
  socket.on('disconnect', () => console.log('Usuário desconectado'));
});

http.listen(3000, () => {
  console.log(`Servidor rodando na porta 3000 - Link http://localhost:3000`);
});