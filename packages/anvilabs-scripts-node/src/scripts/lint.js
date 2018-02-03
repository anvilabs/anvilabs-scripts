const path = require('path');

const {getRawArgs, resolveBin} = require('anvilabs-scripts-core/utils');
const spawn = require('cross-spawn');

const rawArgs = getRawArgs();

const commandArgs = rawArgs.includes('--fix') ? ['--fix'] : [];
const nraArgs = [
  ...rawArgs.filter(arg => arg !== '--fix'),
  rawArgs.includes('-s') ||
  rawArgs.includes('--sequential') ||
  rawArgs.includes('--serial')
    ? []
    : ['--parallel'],
];

const buildCommandForScriptName = scriptName => {
  const scriptPath = path.join(process.cwd(), `${scriptName}.js`);

  return `'${['node', scriptPath, ...commandArgs].join(' ')}'`;
};

const result = spawn.sync(
  resolveBin('npm-run-all', {fromDir: __dirname}),
  [
    '--aggregate-output',
    '--print-label',
    '--silent',
    ...nraArgs,
    ...['eslint', 'tslint'].map(buildCommandForScriptName),
  ],
  {stdio: 'inherit'}
);

process.exit(result.status);
