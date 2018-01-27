const configGlobal = require("./config/configGlobal"),
  path = require("path"),
  fs = require("fs");

function createDist(targetDir, isRelativeToScript) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}


function prepareDistDirectoryFile(filePath) {
  const sep = path.sep;
  const baseDir = path.dirname(filePath);
  const extension = path.extname(filePath);
  const targetDir = baseDir.replace(configGlobal.configuracao.wordFileSource, configGlobal.configuracao.dist);
  const filePathDist = path.resolve(filePath.replace(configGlobal.configuracao.wordFileSource, configGlobal.configuracao.dist));
  createDist(targetDir);
  return {
    distDirectory: targetDir,
    filePathDist: filePathDist,
    extension: extension,
    filePathWithoutExtension: filePathDist.replace(extension, "")
  }
}


exports.createDist = createDist;
exports.prepareDistDirectoryFile = prepareDistDirectoryFile;