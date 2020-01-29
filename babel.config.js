'use-strict';

module.exports = (api) => {
  api.cache.forever();

  return {
    presets: ['next/babel'],
    plugins: [['styled-components', { 'ssr': true }]]
  };
};
