const path = require('path');

const readPkgUp = require('read-pkg-up');

const resolveBin = (moduleMain, {executable} = {}) => {
  try {
    const moduleMainDir = path.dirname(moduleMain);
    const {pkg: modulePkg, path: modulePkgPath} = readPkgUp.sync({
      cwd: moduleMainDir,
    });
    const {name, bin} = modulePkg;
    const modulePkgDir = path.dirname(modulePkgPath);

    const binPath = typeof bin === 'string' ? bin : bin[executable || name];
    const fullPathToBin = path.join(modulePkgDir, binPath);

    return fullPathToBin.replace(process.cwd(), '.');
  } catch (error) {
    throw error;
  }
};

module.exports = resolveBin;
