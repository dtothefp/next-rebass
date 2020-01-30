const path = require(`path`);
const transpileModules = require(`next-transpile-modules`);
const withESLint = require(`next-eslint`);
const withCustomBabelConfigFile = require(`next-plugin-custom-babel-config`);
const withPlugins = require(`next-compose-plugins`);

const withTM = transpileModules([
 `@css`, path.join(__dirname, `packages`)
]);

const {ASSET_PREFIX: assetPrefix = ``} = process.env;

module.exports = withPlugins([withTM, withESLint, withCustomBabelConfigFile], {
  babelConfigFile: path.join(__dirname, `babel.config.js`),
  assetPrefix,
  eslintLoaderOptions: {
    // failOnWarning: true,
    emitWarning: true,
    quiet: false,
  },
  webpack(config) {
    return config;
  }
});
