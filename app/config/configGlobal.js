var pjson = require('../../package.json');

let config = {
    wordFileSource: pjson.wordFileSource,
    mdDist: pjson.mdDist,
    dest: pjson.dest,
    siteName: pjson.siteName
}


exports.setWordFileSource = function(newPath)
{
    config.wordFileSource = newPath;
}

exports.getWordFileSource = function()
{
    return config.wordFileSource;
}

exports.setMdDist = function(newPath){
    config.mdDist = newPath
}

exports.getMdDist = function(){
   return config.mdDist;
}

//exports.configuracao = config;