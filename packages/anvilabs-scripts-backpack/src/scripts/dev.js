const {getRawArgs, resolveBin} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();

const result = spawn.sync(
  resolveBin('backpack', {fromDir: __dirname}),
  ['dev', '--inspect=0.0.0.0:9229', ...rawArgs],
  {
    stdio: 'inherit',
  }
);

process.exit(result.status);
