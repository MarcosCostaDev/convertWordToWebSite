var pjson = require('../../package.json');

exports.configuracao = {
    wordFileSource: pjson.wordFileSource,
    mdDist: pjson.mdDist,
    dest: pjson.dest,
    siteName: pjson.siteName
}