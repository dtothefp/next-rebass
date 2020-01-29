const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const { promisify } = require('util');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;
const listen = promisify(server.listen.bind(server));

io.on('connect', (socket) => {
  socket.emit('now', {
    message: 'hello'
  });
});

nextApp.prepare().then(async () => {
  app.get('*', nextHandler);

  await listen(port);

  console.log(`> Ready on http://localhost:${port}`);
}).catch((err) => {
  throw err;
});
