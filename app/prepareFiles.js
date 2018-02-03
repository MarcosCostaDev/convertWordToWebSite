
const configGlobal = require("./config/configGlobal"),
  path = require("path"),
  Enumerable = require("linq"),
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
  const destDirAbsolute = path.resolve(global.config.mdDist);
  const targetDir = baseDir.replace(global.config.wordFileSource, global.config.mdDist);
  const filePathDist = path.resolve(filePath.replace(global.config.wordFileSource, targetDir));

  createDist(targetDir);

  return {
    distDirectory: targetDir,
    filePathDist: filePathDist,
    extension: extension,
    fileNameWithoutExtension: filePathDist.replace(destDirAbsolute + "\\", "").replace(extension, ""),
    filePathWithoutExtension: filePathDist.replace(extension, "")
  }
}

function prepareFolderDistDirectory(fileName, separator) {
  let pathArray = fileName.split(separator).map(p => p.trim());
  let fileNameFinal = Enumerable.from(pathArray).lastOrDefault("");
  let directories = Enumerable.from(pathArray).take(pathArray.length - 1).toArray();
  let directoryDistFile = "";

  if (directories.length > 0) {

    directoryDistFile = `${global.config.mdDist}\\${directories.join("\\")}`;


    createDist(directoryDistFile, false);
    directoryDistFile = path.resolve(directoryDistFile);;

  }
  else {
    if (fileName.startsWith("index")) {
      directoryDistFile = `${global.config.dest}\\`;
    }
    else {

      directoryDistFile = path.resolve(`${global.config.mdDist}`);
    }
  }


  return {
    fileName: fileNameFinal,
    directory: directoryDistFile,
    filePathFinal: `${directoryDistFile}\\${fileNameFinal}`
  }

}


exports.createDist = createDist;
exports.prepareDistDirectoryFile = prepareDistDirectoryFile;
exports.prepareFolderDistDirectory = prepareFolderDistDirectory;