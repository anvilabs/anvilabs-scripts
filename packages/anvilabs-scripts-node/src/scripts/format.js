const path = require('path');

const {
  hasFileRelative,
  getRawArgs,
  getPositionalArgs,
  hasPkgProp,
  resolveBin,
} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();
const positionalArgs = getPositionalArgs(rawArgs);

const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), '.');

const useBuiltinConfig =
  !rawArgs.includes('--config') &&
  !hasFileRelative('.prettierrc') &&
  !hasFileRelative('prettier.config.js') &&
  !hasPkgProp('prettierrc');
const configArgs = useBuiltinConfig
  ? ['--config', hereRelative('../config/prettier.config.js')]
  : [];

const useBuiltinIgnorePath =
  !rawArgs.includes('--ignore-path') && !hasFileRelative('.prettierignore');
const ignorePathArgs = useBuiltinIgnorePath
  ? ['--ignore-path', '.gitignore']
  : [];

const writeArgs = rawArgs.includes('--no-write') ? [] : ['--write'];

const filesToApply = positionalArgs.length ? [] : ['**/*.+(js|ts|json|md)'];

const result = spawn.sync(
  resolveBin(require.resolve('prettier')),
  [...configArgs, ...ignorePathArgs, ...writeArgs, ...rawArgs, ...filesToApply],
  {stdio: 'inherit'}
);

process.exit(result.status);
