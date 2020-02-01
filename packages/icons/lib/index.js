const iconsContext = require.context(`./`, false, /\.svg$/);

const nameRe = /^.*\/(.*)\.svg$/;
const keys = iconsContext.keys();

export default keys.reduce((icons, key) => {
  const name = key.match(nameRe)[1];
  icons[name] = iconsContext(key);

  return icons;
}, {});
