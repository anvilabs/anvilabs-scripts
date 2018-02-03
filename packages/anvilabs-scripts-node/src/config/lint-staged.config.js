const {resolveBin} = require('anvilabs-scripts-core/utils');

const anvilabsScriptsNode = resolveBin('anvilabs-scripts-node', {
  fromDir: __dirname,
});

module.exports = {
  linters: {
    '{*.js,{src,typings}/**/*.{js,ts}}': [
      `${anvilabsScriptsNode} eslint --fix`,
      'git add',
    ],
    '{src,typings}/**/*.ts': [`${anvilabsScriptsNode} tslint --fix`, 'git add'],
    '{*.json,*/*.json}': [`${anvilabsScriptsNode} format`, 'git add'],
  },
};
