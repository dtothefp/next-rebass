const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const path = require('path');
const { promisify } = require('util');
const { readJson, outputJson } = require('fs-extra');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;
const listen = promisify(server.listen.bind(server));
const jsonFp = path.join(__dirname, 'challenge_data.json');

io.on('connect', async (socket) => {
  let updating = {};
  let i = 0;

  socket.on('update', async (item, cb) => {
    updating[item.id] = item;

    console.log('waiting to update');
    await new Promise((res) => setTimeout(res, 5000));
    console.log('updating');

    try {
      const data = await readJson(jsonFp);
      const ids = data.map(({id}) => id);
      const idx = ids.indexOf(item.id);
      const newData = [
        ...data.slice(0, idx),
        item,
        ...data.slice(idx + 1)
      ];

      await outputJson(path.join(jsonFp), newData, {spaces: 2});

      cb(null, item);
    } catch (err) {
      cb(new Error(`Failed to update item ${item.id}`));
    }

    delete updating[item.id];
  });

  setInterval(async () => {
    // potentially cache
    const data = await readJson(jsonFp);
    const items = data
      .filter(({sent_at_second: s}) => s <= i)
      .map((item) => {
        const updatingData = updating[item.id];

        // avoid sending a mismatch of data to the front-end if item is updating
        if (updatingData) {
          return {...item, ...updatingData};
        }

        return item;
      })
      .sort((a, b) => a.sent_at_second - b.sent_at_second);

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
