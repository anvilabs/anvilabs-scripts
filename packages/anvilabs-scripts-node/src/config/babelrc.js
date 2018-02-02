const {hasAnyDep} = require('anvilabs-scripts-core/utils');

module.exports = {
  presets: [
    [
      'env',
      {
        targets: {
          node: '8.8.0',
        },
      },
    ],
  ],
  plugins: [
    hasAnyDep(['lodash', 'ramda'])
      ? ['lodash', {id: ['lodash', 'ramda']}]
      : null,
    [
      'module-resolver',
      {
        alias: {
          src: './src',
        },
        extensions: ['.js', '.ts', '.json'],
      },
    ],
  ].filter(plugin => !!plugin),
};
