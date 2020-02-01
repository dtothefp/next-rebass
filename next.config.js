const path = require(`path`);
const transpileModules = require(`next-transpile-modules`);
const withESLint = require(`next-eslint`);
const withCustomBabelConfigFile = require(`next-plugin-custom-babel-config`);
const withPlugins = require(`next-compose-plugins`);
const { alias } = require('@css/scripts');

const withTM = transpileModules([`@css`, path.join(__dirname, `packages`)]);
const {ASSET_PREFIX: assetPrefix = ``} = process.env;

module.exports = withPlugins([withTM, withESLint, withCustomBabelConfigFile], {
  babelConfigFile: path.join(__dirname, `babel.config.js`),
  assetPrefix,
  env: {
    SERVER_URL: 'http://localhost:3000',
  },
  eslintLoaderOptions: {
    // failOnWarning: true,
    emitWarning: true,
    quiet: false,
  },
  webpack(config, { dev, isServer }) {


    if (dev) {
      Object.assign(config.resolve.alias, alias());
    }

    if (isServer) {
      config.resolve.mainFields.reverse();
    }

    return config;
  }
});
