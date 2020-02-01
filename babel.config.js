'use-strict';

module.exports = (api) => {
  const env = api.env();

  api.cache.forever();

  if (env === 'cjs') {
    return {
      presets: [
        [ '@babel/preset-env', {
          modules: 'commonjs',
          targets: {
            node: 'current'
          }
        }],
        [ '@babel/preset-react', {
          development: false,
          pragma: '__jsx',
        }]
      ],
      plugins: [
        ['@babel/plugin-transform-runtime', {
          helpers: true,
          corejs: false,
          regenerator: false,
          useESModules: false
        }],
        '@babel/plugin-proposal-export-namespace-from'
      ]
    }
  }

  if (env === 'es') {
    return {
      presets: [
        [ '@babel/preset-env', {modules: false} ],
        [ '@babel/preset-react', {
          development: false,
          pragma: '__jsx',
        }]
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime', {
            helpers: true,
            corejs: false,
            regenerator: false,
            useESModules: true
        }],
        '@babel/plugin-proposal-export-namespace-from'
      ]
    }
  }

  return {
    presets: ['next/babel'],
    plugins: [
      'emotion',
      '@babel/plugin-proposal-export-namespace-from'
    ]
  };
};
