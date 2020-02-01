const path = require(`path`);
const fs = require(`fs`);
const { transformSync: babelTransform } = require(`@babel/core`);
const babel = require(`rollup-plugin-babel`);
const { createFilter } = require(`rollup-pluginutils`);
const requireContext = require(`rollup-plugin-require-context`);
const { optimize } = require(`react-svg-core`);

// Babel Transform
const transform = ({jsx = false, format} = {}) => (content) => {
  return babelTransform(content, {
    babelrc: false,
    configFile: false,
    presets: [jsx ? void 0 : `@babel/preset-react`].filter(Boolean),
    plugins: [
      `@babel/plugin-syntax-jsx`,
      `babel-plugin-react-svg`,
      [ `@babel/plugin-transform-runtime`, {
        helpers: true,
        corejs: false,
        regenerator: false,
        useESModules: format === `esm`,
      }],
    ],
  });
};

// HACK: unfortunately the `react-svg-core` implemented by the `rollup-plugin-svg-loader` hardcodes
// the Babel configuration resulting in multiple duplicates of babel runtime helpers. the code here
// is taken from these modules and configured to introduce the `@babel/plugin-transform-runtime`
// in order to remove duplicated babel runtime helpers.
// https://github.com/boopathi/react-svg-loader/tree/master/packages/rollup-plugin-react-svg
const reactSvgLoadPlugin = (options = {}) => {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: `react-svg`,
    load(id) {
      if (!filter(id) || path.extname(id) !== `.svg`) return;

      const contents = fs.readFileSync(id);
      const { jsx, output } = options;
      const { format } = output;

      return Promise.resolve(String(contents))
        .then(optimize(options.svgo))
        .then(transform({jsx, format}))
        .then((result) => result.code);
    },
  };
};

const svgo = {
  plugins: [
    {
      convertStyleToAttrs: true,
    },
    {
      convertTransform: true,
    },
    {
      removeAttrs: {
        active: true,
        attrs: [ `class`, `id` ],
      },
    },
    {
      removeDesc: false,
    },
    {
      removeDimensions: true,
    },
    {
      removeStyleElement: true,
    },
    {
      removeTitle: false,
    },
    {
      removeViewBox: false,
    },
    {
      removeXMLNS: true,
    },
    {
      sortAttrs: true,
    },
  ],
};

const entries = [
  {
    input: `lib/index.js`,
    output: {
      file: `es/index.js`,
      format: `esm`,
    },
  },
  {
    input: `lib/index.js`,
    output: {
      file: `cjs/index.js`,
      format: `cjs`,
    },
  },
];

const addConfig = (entry) => ({
  ...entry,
  plugins: [
    requireContext(),
    reactSvgLoadPlugin({
      svgo,
      output: entry.output,
    }),
    babel({
      babelrc: false,
      presets: [
        [ `@babel/preset-env`, {
          modules: false,
        }],
      ],
    }),
  ],
  external: [
    `@babel/runtime/helpers/extends`,
    `@babel/runtime/helpers/esm/extends`,
    `react`,
  ],
});

module.exports = entries.map(addConfig);
