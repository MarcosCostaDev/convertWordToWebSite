var pjson = require('../../package.json');

global.config = {
    wordFileSource: pjson.wordFileSource,
    mdDist: pjson.mdDist,
    dest: pjson.dest,
    siteName: pjson.siteName
}

//exports.configuracao = config;