// @ts-check
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
  !rawArgs.includes('-c') &&
  !rawArgs.includes('--config') &&
  !hasFileRelative('.eslintrc') &&
  !hasFileRelative('.eslintrc.js') &&
  !hasPkgProp('eslintConfig');
const configArgs = useBuiltinConfig
  ? ['--config', hereRelative('../config/eslintrc.js')]
  : [];

const useBuiltinIgnore =
  !rawArgs.includes('--ignore-path') &&
  !hasFileRelative('.eslintignore') &&
  !hasPkgProp('eslintIgnore');
const ignoreArgs = useBuiltinIgnore
  ? ['--ignore-path', hereRelative('../config/eslintignore')]
  : [];

const cacheArgs = rawArgs.includes('--no-cache') ? [] : ['--cache'];

const filesGiven = positionalArgs.length > 0;
const filesToApply = filesGiven ? [] : ['.'];

const result = spawn.sync(
  resolveBin(require.resolve('eslint')),
  [
    ...configArgs,
    ...ignoreArgs,
    '--ext',
    '.js,.ts',
    ...cacheArgs,
    ...rawArgs,
    ...filesToApply,
  ],
  {stdio: 'inherit'}
);

process.exit(result.status);
