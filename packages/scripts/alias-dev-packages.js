const path = require(`path`);
const {readJsonSync} = require(`fs-extra`);
const {readdirSync} = require(`fs`);

module.exports = ({
  cwd = process.cwd(),
  packages = `packages`,
  mains = [ `dist`, `cjs` ],
  blacklist = [],
  exact = false,
} = {}) => {
  const base = path.join(cwd, packages);
  const dirs = readdirSync(base);
  const mainDirs = Array.isArray(mains) ? mains.join(`|`) : mains;
  const re = new RegExp(`^\\.?/?(${mainDirs})`);
  // add the "$" for an exact match for Webpack
  // https://webpack.js.org/configuration/resolve/#resolvealias
  const matchChr = exact ? `$` : ``;

  return dirs.reduce((acc, dir) => {
    if (blacklist.includes(dir)) return acc;

    const packagePath = path.join(base, dir);
    const {name, main} = readJsonSync(
      path.join(packagePath, `package.json`)
    );

    if (re.test(main)) {
      acc[name + matchChr] = path.join(packagePath, `lib`, `index.js`);
    }

    return acc;
  }, {});
};
