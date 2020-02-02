const app = require(`express`)();
const server = require(`http`).Server(app);
const io = require(`socket.io`)(server);
const next = require(`next`);
const path = require(`path`);
const { promisify } = require(`util`);
const { readJson, outputJson } = require(`fs-extra`);

const dev = process.env.NODE_ENV !== `production`;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const port = 3000;
const listen = promisify(server.listen.bind(server));
const jsonFp = path.join(__dirname, `challenge_data.json`);

io.on(`connect`, async (socket) => {
  let i = 0;

  socket.on(`update`, async (newItem, cb) => {
    try {
      const data = await readJson(jsonFp);
      const idx = data.findIndex(({id}) => id === newItem.id);
      const item = data[idx];
      const newData = [
        ...data.slice(0, idx),
        {...item, ...newItem},
        ...data.slice(idx + 1),
      ];

      await outputJson(path.join(jsonFp), newData, {spaces: 2});

      cb(null, item);
    } catch (err) {
      cb(new Error(`Failed to update item ${newItem.id}`));
    }
  });

  setInterval(async () => {
    // potentially cache
    const data = await readJson(jsonFp);
    const items = data.filter(({sent_at_second: s}) => s <= i);

    socket.emit(`data`, {items});

    i += 1;

    // if (i > 5) clearInterval(id);
  }, 1000);
});

nextApp.prepare().then(async () => {
  app.get(`*`, nextHandler);

  await listen(port);

  console.log(`> Ready on http://localhost:${port}`);
}).catch((err) => {
  throw err;
});
