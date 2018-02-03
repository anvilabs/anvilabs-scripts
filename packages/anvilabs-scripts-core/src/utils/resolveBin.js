const path = require('path');

const loadJsonFile = require('load-json-file');
const resolvePkg = require('resolve-pkg');

const resolveBin = (moduleName, {fromDir, executable}) => {
  try {
    const modulePkgPath = resolvePkg(`${moduleName}/package.json`, {
      cwd: fromDir,
    });
    if (!modulePkgPath) {
      throw new Error(`Cannot find module '${moduleName}'`)();
    }

    const modulePkgDir = path.dirname(modulePkgPath);
    const modulePkg = loadJsonFile.sync(modulePkgPath);

    const {name, bin} = modulePkg;

    const binPath = typeof bin === 'string' ? bin : bin[executable || name];
    const fullPathToBin = path.join(modulePkgDir, binPath);

    return fullPathToBin.replace(process.cwd(), '.');
  } catch (error) {
    throw error;
  }
};

module.exports = resolveBin;
