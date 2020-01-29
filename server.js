const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const path = require('path');
const { promisify } = require('util');
const { readJson } = require('fs-extra');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;
const listen = promisify(server.listen.bind(server));
const readThenable = readJson(path.join(__dirname, 'challenge_data.json'));

io.on('connect', async (socket) => {
  const data = await readThenable;
  let i = 0;

  setInterval(async () => {
    const items = data.filter(({sent_at_second: s}) => s <= i);

    socket.emit('data', {items});

    i += 1;
  }, 1000);
});

nextApp.prepare().then(async () => {
  app.get('*', nextHandler);

  await listen(port);

  console.log(`> Ready on http://localhost:${port}`);
}).catch((err) => {
  throw err;
});
