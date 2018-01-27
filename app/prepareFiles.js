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


function getInformationFilePath(filePath) {
  const sep = path.sep;
  const targetDir = path.baseDir(filePath);
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  console.log(targetDir);
}


exports.createDist = createDist;
exports.getInformationFilePath = getInformationFilePath;