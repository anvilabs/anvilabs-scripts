const path = require('path');

const {
  hasFileRelative,
  getRawArgs,
  resolveBin,
  resolveFromRoot,
} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();

const here = p => path.join(__dirname, p);
const hereRelative = p => here(p).replace(process.cwd(), '.');

const useBuiltinConfig =
  !rawArgs.includes('-c') &&
  !rawArgs.includes('--config') &&
  !hasFileRelative('tslint.json') &&
  !hasFileRelative('tslint.yaml');
const configArgs = useBuiltinConfig
  ? ['--config', hereRelative('../config/tslint.json')]
  : [];

const useBuiltinProject =
  !rawArgs.includes('-p') && !rawArgs.includes('--project');
const projectArgs = useBuiltinProject
  ? ['--project', resolveFromRoot('.')]
  : [];

const result = spawn.sync(
  resolveBin('tslint', {fromDir: __dirname}),
  [...configArgs, ...projectArgs, '--format', 'stylish', ...rawArgs],
  {stdio: 'inherit'}
);

process.exit(result.status);
