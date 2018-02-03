const {getRawArgs, resolveBin} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();

const result = spawn.sync(
  resolveBin('backpack', {fromDir: __dirname}),
  ['build', ...rawArgs],
  {
    stdio: 'inherit',
  }
);

process.exit(result.status);
