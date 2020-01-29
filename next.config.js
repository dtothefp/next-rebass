const path = require(`path`);
const withTM = require(`next-transpile-modules`);
const withESLint = require(`next-eslint`);
const withCustomBabelConfigFile = require(`next-plugin-custom-babel-config`);

const {ASSET_PREFIX: assetPrefix = ``} = process.env;

module.exports = withESLint(withTM(withCustomBabelConfigFile({
  babelConfigFile: path.join(__dirname, `babel.config.js`),
  assetPrefix,
  transpileModules: [ `@css`, path.join(__dirname, `packages`) ],
  eslintLoaderOptions: {
    // failOnWarning: true,
    emitWarning: true,
    quiet: false,
  },
  webpack(config) {
    return config;
  }
})));
