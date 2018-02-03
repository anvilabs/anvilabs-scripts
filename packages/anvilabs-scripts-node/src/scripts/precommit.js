const path = require('path');

const {
  hasFileRelative,
  getRawArgs,
  hasPkgProp,
  resolveBin,
} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();

const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), '.');

const useBuiltinConfig =
  !rawArgs.includes('-c') &&
  !rawArgs.includes('--config') &&
  !hasFileRelative('.lintstagedrc') &&
  !hasFileRelative('lint-staged.config.js') &&
  !hasPkgProp('lint-staged');
const configArgs = useBuiltinConfig
  ? ['--config', hereRelative('../config/lint-staged.config.js')]
  : [];

const result = spawn.sync(
  resolveBin('lint-staged', {fromDir: __dirname}),
  [...configArgs, ...rawArgs],
  {stdio: 'inherit'}
);

process.exit(result.status);
