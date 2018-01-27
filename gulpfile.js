const configGlobal = require("./app/config/configGlobal"),
    gulp = require("gulp"),
    mammoth = require("mammoth"),
    through = require("through2"),
    prepareFiles = require("./app/prepareFiles"),
    converter = require("./app/converter")

let caminhos = [
    `${configGlobal.configuracao.wordFileSource}\\*.{doc,docx}`,
    `!${configGlobal.configuracao.wordFileSource}\\~$*.{doc,docx}`,
]


gulp.task("default", function () {

    prepareFiles.createDist(configGlobal.configuracao.dist, false);

    return gulp.src(caminhos)
        .pipe(through.obj((chunk, enc, cb) => {
            converter.convertWordToMd(chunk.history[0]);
            cb(null, chunk)
        }));
});
