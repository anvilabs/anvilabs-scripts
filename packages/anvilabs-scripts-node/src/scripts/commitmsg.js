const {
  hasFileRelative,
  hasPkgProp,
  resolveBin,
} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const useExtends =
  !hasFileRelative('commitlint.config.js') &&
  !hasFileRelative('.commitlintrc.js') &&
  !hasFileRelative('.commitlintrc.json') &&
  !hasFileRelative('.commitlintrc.yml') &&
  !hasPkgProp('commitlint');
const extendsArgs = useExtends
  ? ['--extends', '@anvilabs/commitlint-config']
  : [];

const result = spawn.sync(
  resolveBin(require.resolve('@commitlint/cli'), {executable: 'commitlint'}),
  [...extendsArgs, '--edit'],
  {
    stdio: 'inherit',
  }
);

process.exit(result.status);
