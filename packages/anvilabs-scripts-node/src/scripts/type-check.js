const {resolveBin, resolveFromRoot} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const result = spawn.sync(
  resolveBin(require.resolve('typescript'), {executable: 'tsc'}),
  ['--project', resolveFromRoot('tsconfig.json'), '--noEmit'],
  {
    stdio: 'inherit',
  }
);

process.exit(result.status);
