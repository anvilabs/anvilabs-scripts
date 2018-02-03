const {resolveBin, resolveFromRoot} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const typesyncResult = spawn.sync(
  resolveBin('typesync', {fromDir: __dirname}),
  [resolveFromRoot('package.json')],
  {
    stdio: 'inherit',
  }
);

if (typesyncResult.status !== 0) {
  process.exit(typesyncResult.status);
}

const installResult = spawn.sync('yarn', [
  'install',
  '--cwd',
  resolveFromRoot('.'),
]);

process.exit(installResult.status);
